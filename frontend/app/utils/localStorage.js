export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    const lastUpdated = localStorage.getItem("lastUpdated");
    if (serializedState === null || new Date() - lastUpdated < 15 * 60 * 1000) {
      localStorage.removeItem("state");
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    // eslint-disable-next-line
    console.log("loadStorage :: Error ", e);
    return undefined;
  }
};

let disabled = false;
export const saveState = ({ state, lastUpdated }) => {
  try {
    if (!disabled) {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("state", serializedState);
      localStorage.setItem("lastUpdated", lastUpdated);
    }
  } catch (e) {
    // eslint-disable-next-line
    disabled = true;
    localStorage.removeItem("state");
  }
};
