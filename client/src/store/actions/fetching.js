import { FETCHING_PENDING, FETCHING_SUCCESS, FETCHING_ERROR } from "../constants/actionTypes";

export const fetchPendinng = () => {
  return {
    type: FETCHING_PENDING
  };
};

export const fetchSuccess = () => {
  return {
    type: FETCHING_SUCCESS
  };
};

export const fetchError = error => {
  return {
    type: FETCHING_ERROR,
    error: error
  };
};
