import { fetchPendinng, fetchSuccess, fetchError } from "../store/actions/fetching";
import { storeAppData } from "../store/actions/appData";
import { toggleInfoModal } from "../store/actions/index";

export function findUserPosition() {
  return async dispatch => {
    dispatch(fetchPendinng());
    try {
      const { coords } = await getCurrentPosition();
      const { latitude, longitude } = coords;
      const city = await getCityNameFromLatLon(latitude, longitude);
      const position = getUserPositionObject(latitude, longitude, city);

      dispatch(storeAppData(position));
    } catch (error) {
      const res = await getCoordinatesAndCityFromIP();

      const position = res && getUserPositionObject(res.latitude, res.longitude, res.city);

      dispatch(storeAppData(position));
      dispatch(toggleInfoModal());
    }
    dispatch(fetchSuccess());
  };
}

function getUserPositionObject(latitude, longitude, city) {
  return {
    tag: "userPosition",
    data: {
      haveUserLoacation: true,
      latitude: latitude,
      longitude: longitude,
      city: city
    }
  };
}

export function setNewUserPositonBy(cityName) {
  return async dispatch => {
    dispatch(fetchPendinng());
    return fetch(`https://www.geocode.xyz/${cityName}?region=DE&json=1`)
      .then(res => res.json())
      .then(coords => {
        const position = getUserPositionObject(coords.latt, coords.longt, cityName);

        dispatch(storeAppData(position));
        dispatch(fetchSuccess());
      })
      .catch(error => dispatch(fetchError(error)));
  };
}

function getCoordinatesAndCityFromIP() {
  return fetch("http://ip-api.com/json/?lang=de")
    .then(res => res.json())
    .then(res => {
      return {
        latitude: res.lat,
        longitude: res.lon,
        city: res.city
      };
    })
    .catch(() => {
      return null;
    });
}

function getCityNameFromLatLon(latitude, longitude) {
  // dispatch(fetchPendinng());
  return fetch(`https://www.geocode.xyz/${latitude},${longitude}?json=1`)
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        throw res.error;
      }
      return res.city;
    })
    .catch(error => {
      return null;
    });
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
