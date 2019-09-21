import {
  getRandomLocation,
  weightedRandom,
  getRandomIntBetween
} from "./random";
import { STATUSES } from "../constants";

// This acts as an external API call where we get the status and location of vehicle.
// In order to simulate an actual API call, we are returning a promise which
// resolves after randomly selected integer between range of 200ms and 600ms.
export const externalApiRequest = (id, europe) => {
  return new Promise(resolve =>
    setTimeout(() => {
      const status = STATUSES[weightedRandom({ 0: 0.02, 1: 0.18, 2: 0.8 })];
      resolve({
        id,
        status,
        ...getRandomLocation(id, status, {
          forceNorth: true,
          simulateRoad: true,
          europe
        })
      });
    }, getRandomIntBetween(200, 600))
  );
};
