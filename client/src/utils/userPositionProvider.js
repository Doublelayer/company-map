import { fetchPendinng, fetchSuccess, fetchError } from "../store/actions/fetching";
import { storeAppData } from "../store/actions/appData";
import { toggleInfoModal } from "../store/actions/index";

export function findUserPosition() {
  return async dispatch => {
    dispatch(fetchPendinng());
    try {
      const { coords } = await getCurrentPosition();
      const { latitude, longitude } = coords;

      return fetch(`https://www.geocode.xyz/${latitude},${longitude}?json=1`)
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            throw res.error;
          }

          const position = {
            tag: "userPosition",
            data: {
              haveUserLoacation: true,
              latitude: res.latt,
              longitude: res.longt,
              city: res.city
            }
          };

          dispatch(storeAppData(position));
          dispatch(fetchSuccess());
        })
        .catch(error => {
          dispatch(fetchError(error));
        });
    } catch (error) {
      return fetch("http://ip-api.com/json/?lang=de")
        .then(res => res.json())
        .then(res => {
          const position = {
            tag: "userPosition",
            data: {
              haveUserLoacation: true,
              latitude: res.lat,
              longitude: res.lon,
              city: res.city
            }
          };
          dispatch(storeAppData(position));
          dispatch(toggleInfoModal());
          dispatch(fetchSuccess());
        })
        .catch(error => {
          dispatch(fetchError(error));
        });
    }
  };
}

const locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function getCurrentPosition(options = locationOptions) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}
