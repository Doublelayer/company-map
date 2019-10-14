import { combineReducers } from "redux";

import appConfigReducer from "./appConfig";
import infoModalReducer from "./infoModal";
import pageLoadingReducer from "./pageLoading";
import fetchingReducer from "./fetching";
import loadingReducer from "./loading";
import locationReducer from "./userPosition";
import appDataReducer from "./appData";
import minimizedReducer from "./showHide";

const allReducers = combineReducers({
  showInfoModal: infoModalReducer,
  pageLoadingReducer: pageLoadingReducer,
  fetchingReducer: fetchingReducer,
  loadingReducer: loadingReducer,
  locationReducer: locationReducer,
  appConfigReducer: appConfigReducer,
  appDataReducer: appDataReducer,
  minimizedReducer: minimizedReducer
});

export default allReducers;
