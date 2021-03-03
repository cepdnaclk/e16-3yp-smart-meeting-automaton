import { SET_ALERT, REMOVE_ALERT } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      //Filter out the one alert and retrn back all the alerts other than the one just call
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};
