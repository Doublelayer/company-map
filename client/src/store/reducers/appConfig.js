import { APP_CONFIG, GROUPED_MARKERS } from "../constants/actionTypes";

import { isMobile } from "react-device-detect";

const initialState = {
  groupedMarkers: true,
  isMobile: isMobile
};

const appConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_CONFIG:
      return {
        ...state,
        isMobile: isMobile
      };
    case GROUPED_MARKERS:
      return {
        ...state,
        groupedMarkers: !state.groupedMarkers
      };
    default:
      return state;
  }
};

export default appConfigReducer;
