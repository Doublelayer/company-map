import { FETCHING_PENDING, FETCHING_SUCCESS, FETCHING_ERROR } from "../constants/actionTypes";

const initialState = {
  pending: false,
  error: null
};

const fetchingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCHING_SUCCESS:
      return {
        ...state,
        pending: false
      };
    case FETCHING_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default fetchingReducer;
