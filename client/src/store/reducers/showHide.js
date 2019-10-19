import { MINIMIZED } from "../constants/actionTypes";

import { isMobile } from "react-device-detect";

const initialState = {
  minimized: isMobile
};

const minimizedReducer = (state = initialState, action) => {
  switch (action.type) {
    case MINIMIZED:
      return !state;
    default:
      return state;
  }
};

export default minimizedReducer;
