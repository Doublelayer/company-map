import { fetchPendinng, fetchSuccess, fetchError } from "../store/actions/fetching";
import { storeAppData } from "../store/actions/appData";

export function postTo(URL, TAG, QUERY) {
  return dispatch => {
    dispatch(fetchPendinng());
    return fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(QUERY)
    })
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
