import { combineReducers } from "redux";

import appConfigReducer from "./appConfig";
import infoModalReducer from "./infoModal";
import fetchingReducer from "./fetching";
import loadingReducer from "./loading";
import appDataReducer from "./appData";
import minimizedReducer from "./showHide";

const allReducers = combineReducers({
  showInfoModal: infoModalReducer,
  fetchingReducer: fetchingReducer,
  loadingReducer: loadingReducer,
  appConfigReducer: appConfigReducer,
  appDataReducer: appDataReducer,
  minimizedReducer: minimizedReducer
});

export default allReducers;
