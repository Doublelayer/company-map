import { FETCHING_USER_LOCATION_PENDINNG, FETCHING_USER_LOCATION_SUCCESS, FETCHING_USER_LOCATION_ERROR } from "../constants/actionTypes";

const initialState = {
  location: {
    latitude: "",
    longitude: ""
  },
  city: null,
  haveUserLoacation: false,
  zoom: 12
};

const userLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER_LOCATION_PENDINNG:
      return {
        ...state,
        pending: true
      };
    case FETCHING_USER_LOCATION_SUCCESS:
      return {
        ...state,
        pending: false,
        location: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
        },
        city: action.payload.city,
        haveUserLoacation: true
      };
    case FETCHING_USER_LOCATION_ERROR:
      return {
        ...state,
        pending: false,
        location: {
          latitude: null,
          longitude: null
        },
        haveUserLoacation: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default userLocationReducer;
