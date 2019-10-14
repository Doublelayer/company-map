const pageLoadingReducer = (state = {}, action) => {
  switch (action.type) {
    case "TEST_TEST":
      return {
        ...state,
        test: action.payload
      };
    default:
      return state;
  }
};

export default pageLoadingReducer;
