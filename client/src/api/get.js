import { fetchPendinng, fetchSuccess, fetchError } from "../store/actions/fetching";
import { storeAppData } from "../store/actions/appData";

export function getFrom(URL, TAG) {
  return dispatch => {
    dispatch(fetchPendinng());
    return fetch(URL)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        const payload = {
          data: res,
          tag: TAG
        };
        dispatch(storeAppData(payload));
        dispatch(fetchSuccess());
        return res;
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}
