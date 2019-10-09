import { FETCHING_SECTORS_PENDING, FETCHING_SECTORS_SUCCESS, FETCHING_SECTORS_ERROR } from "../constants/actionTypes";

export const fetchSectorsPendinng = () => {
  return {
    type: FETCHING_SECTORS_PENDING
  };
};

export const fetchSectorsSucces = sectors => {
  return {
    type: FETCHING_SECTORS_SUCCESS,
    sectors: sectors
  };
};

export const fetchSectorsError = error => {
  return {
    type: FETCHING_SECTORS_ERROR,
    error: error
  };
};
