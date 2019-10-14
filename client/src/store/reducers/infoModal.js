import { TOOGLE_INFO_MODAL } from "../constants/actionTypes";

const infoModalReducer = (state = false, action) => {
  switch (action.type) {
    case TOOGLE_INFO_MODAL:
      return !state;
    default:
      return state;
  }
};

export default infoModalReducer;
