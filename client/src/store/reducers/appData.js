import { APP_DATA } from "../constants/actionTypes";

const initialState = {
  userPosition: {
    haveUserLoacation: false,
    latitude: "",
    longitude: "",
    city: ""
  },
  selectedSectors: ""
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
