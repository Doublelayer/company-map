import { PAGE_IS_LOADING } from "../constants/actionTypes";

const initialState = {
  pageIsLoading: true
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAGE_IS_LOADING:
      return {
        ...state,
        pageIsLoading: action.payload
      };
    default:
      return state;
  }
};

export default loadingReducer;
