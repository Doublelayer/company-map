import { PAGE_IS_LOADING } from "../constants/actionTypes";

export const setPageLoading = bool => {
  return {
    type: PAGE_IS_LOADING,
    payload: bool
  };
};
