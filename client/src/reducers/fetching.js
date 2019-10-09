import { FETCHING_SECTORS_PENDING, FETCHING_SECTORS_SUCCESS, FETCHING_SECTORS_ERROR } from "../constants/actionTypes";

const initialState = {
  pending: false,
  sectors: [],
  error: null
};

export function sectorsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_SECTORS_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCHING_SECTORS_SUCCESS:
      return {
        ...state,
        pending: false,
        sectors: action.payload
      };
    case FETCHING_SECTORS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const getSectors = state => state.sectors;
export const getSectorsPending = state => state.pending;
export const getSectorsError = state => state.error;
