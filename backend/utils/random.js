const MIN_LAT = -90;
const MAX_LAT = 90;
const MIN_LNG = -180;
const MAX_LNG = 180;

/**
 * Returns a random floating number.
 * @param {number} from: Starting number.
 * @param {number} to: Ending number.
 * @param {number} fixed: Number of digits after dot.
 * @return {number} The random floating number.
 */
export const getRandomFloatBetween = (from, to, fixed = 0) =>
  (Math.random() * (to - from) + from).toFixed(fixed) * 1;

/**
 * Returns a random integer.
 * @param {number} from: Starting number
 * @param {number} to: Ending number
 * @return {number} The random integer.
 */
export const getRandomIntBetween = (...args) =>
  Math.floor(getRandomFloatBetween(...args));

/**
 * Returns a boolean value with 50/50 chance.
 * @return {number} The boolean value.
 */
export const getRandomBool = () => Math.random() < 0.5;

/**
 * Normalizes a number to be between 0 and number.
 * @param {number} value: The number to be normalized.
 * @param {number} normalize: The maximum allowed number.
 * @return {number} normalize: The number to be normalized.
 * 0 < value < normalize
 */
export const normalize = (value, normalize) =>
  value < -normalize ? -normalize : value % (normalize + 1);

/**
 * Decides `to` value according to `from` value.
 * @param {number} to Starting number
 * @param {number} from Ending number
 * @param {number} max Max available value
 * @return {number}  If from is bigger than to, returns max.
 * * * * * * * * * * Else, returns the normalized value according to max.
 */
export const getMaxIfBigger = (from, to, max) =>
  from > to ? max : normalize(to, max);

/**
 * Returns a random location.
 * @param {string} id: ID of the vehicle
 * @param {string} status: Status of the vehicle
 * @param {object} options: The options object.
 * Available options:
 *    @key {number} latFrom: Starting latitude
 *    @key {number} latTo: Ending latitude
 *    @key {number} lngFrom: Starting longitude
 *    @key {number} lngTo: Ending longitude
 *    @key {bool} forceNorth: Forces random location to be on northern hemisphere
 *    @key {bool} forceSouth: Forces random location to be on southern hemisphere
 *    @key {bool} simulateRoad: Forces random location to be restricted to small space.
 *  if both are forceNorth and forceSouth is true, forces minimum number latitude value, which is `MIN_LAT`.
 * @return {object} The random location object: { lat: {number}, lng: {number}}.
 */
// simulateRoad needs 3 variables. Whether the vehicle is going left or right and the direction of the vehicle.
let prevLocations = [];
let directions = [];
export const getRandomLocation = (id = "", status = "", options = {}) => {
  const index = prevLocations.findIndex(location => location.id === id);
  const location = prevLocations[index] || {};
  const { prevLat, prevLng } = location;
  if (
    (status === "Waiting" || status === "Not Responding") &&
    (prevLat && prevLng)
  ) {
    return { lat: prevLat, lng: prevLng };
  }

  const {
    latFrom = MIN_LAT,
    latTo = MAX_LAT,
    lngFrom = MIN_LNG,
    lngTo = MAX_LNG,
    simulateRoad,
    europe,
    ...latOptions
  } = options;

  const normalizedLatFrom = europe ? 40 : normalize(latFrom, MAX_LAT);
  const normalizedLatTo = europe
    ? 55
    : getMaxIfBigger(normalizedLatFrom, latTo, MAX_LAT);
  const normalizedLngFrom = europe ? -10 : normalize(lngFrom, MAX_LNG);
  const normalizedLngTo = europe
    ? 30
    : getMaxIfBigger(normalizedLngFrom, lngTo, MAX_LNG);

  if (simulateRoad) {
    if (prevLat && prevLng) {
      const direction = directions.find(x => x.id === id);
      let left;
      if (direction) {
        ({ left } = direction);
      } else {
        left = getRandomBool();
        directions.push({ id, left });
      }

      const nextLat = normalize((left ? -1 : 1) * 0.04 + prevLat, MAX_LAT);
      const lat = getRandomFloatBetween(prevLat, nextLat, 6);
      const nextLng = normalize((left ? -1 : 1) * 0.08 + prevLng, MAX_LNG);
      const lng = getRandomFloatBetween(prevLng, nextLng, 6);
      changePrevLocations(index, {
        id,
        prevLat: lat,
        prevLng: lng
      });
      return { lat, lng };
    }
  }
  const lat = getRandomFloatBetween(
    ...parseLatOptions(latOptions, normalizedLatFrom, normalizedLatTo),
    6
  );
  const lng = getRandomFloatBetween(normalizedLngFrom, normalizedLngTo, 6);

  changePrevLocations(index, {
    id,
    prevLat: lat,
    prevLng: lng
  });
  return { lat, lng };
};

// Helper function for getRandomLocation. Sets previously generated
// lat and lng values in order to keep consistency within the system and
// vehicle movement.
const changePrevLocations = (index, loc) => {
  if (index === -1) {
    prevLocations.push(loc);
  } else {
    prevLocations[index] = loc;
  }
};

// Helper function in order to clear location data.
export const clear = id => {
  if (id) {
    const index = prevLocations.findIndex(location => location.id === id);
    if (index > -1) {
      prevLocations.splice(index, 1);
      directions.splice(index, 1);
    } else {
      throw `Can't find location of vehicle with id ${id}`;
    }
  }
  prevLocations = [];
  directions = [];
};

/**
 * Helper function for getRandomLocation which parses options.
 * @param {object} latOptions Refer to getRandomLocation function parameters.
 * @param {number} from Latitude value
 * @param {number} to Latitude value
 * @return {float} The latitude according to options.
 */

const parseLatOptions = (latOptions = {}, from, to) => {
  const { forceNorth, forceSouth } = latOptions;
  switch (true) {
    case !forceNorth && !forceSouth:
      return [from, to];
    case forceNorth && forceSouth:
      return [MIN_LAT, MAX_LAT];
    case forceNorth:
      return [0, Math.abs(to)];
    case forceSouth:
      return [-Math.abs(from), 0];
  }
};

/**
 * Selects a random number according to given weight.
 * @param {object} spec Object that contains items to choose and their chance to getting chosen
 *  @key {number} Number that will be chosen.
 *  @value {number} Change of this number to be chosen.
 * Structure: { numberToBeChosen: weight (between 0 and 1)}
 * Example: { 0: 0.8, 1: 0.2, 2: 0.2 }
 * Added weights should be equal to 1.
 * @return {number} The random number based on weight.
 */
export const weightedRandom = spec => {
  let sum = 0;
  const r = Math.random();
  for (let i in spec) {
    sum += spec[i];
    if (r <= sum) return i;
  }
};
