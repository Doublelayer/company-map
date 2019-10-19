import { FETCHING_USER_LOCATION_PENDINNG, FETCHING_USER_LOCATION_SUCCESS, FETCHING_USER_LOCATION_ERROR } from "../constants/actionTypes";

export const fetchUserLocationPendinng = () => {
  return {
    type: FETCHING_USER_LOCATION_PENDINNG
  };
};

export const fetchUserLocationSuccess = location => {
  return {
    type: FETCHING_USER_LOCATION_SUCCESS,
    payload: location
  };
};

export const fetchUserLocationError = error => {
  return {
    type: FETCHING_USER_LOCATION_ERROR,
    error: error
  };
};
