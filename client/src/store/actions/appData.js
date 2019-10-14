import { APP_DATA } from "../constants/actionTypes";

export const storeAppData = payload => {
  return {
    type: APP_DATA,
    tag: payload.tag,
    payload: payload.data
  };
};
