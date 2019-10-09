import { combineReducers } from "redux";

import infoModalReducer from "./infoModal";
import pageLoadingReducer from "./pageLoading";
import test from "./testReducer";

const allReducers = combineReducers({
  showInfoModal: infoModalReducer,
  pageLoadingReducer: pageLoadingReducer,
  test: test
});

export default allReducers;
