import { APP_DATA } from "../constants/actionTypes";

const initialState = {
  userPosition: {
    haveUserLoacation: false,
    latitude: 0,
    longitude: 0,
    city: ""
  }
};

const appDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_DATA:
      return {
        ...state,
        [action.tag]: action.payload
      };
    default:
      return state;
  }
};

export default appDataReducer;
