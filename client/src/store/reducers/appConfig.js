import { APP_CONFIG } from "../constants/actionTypes";

import { isMobile } from "react-device-detect";

const appConfigReducer = (state = {}, action) => {
  switch (action.type) {
    case APP_CONFIG:
      return {
        ...state,
        isMobile: isMobile
      };
    default:
      return state;
  }
};

export default appConfigReducer;
