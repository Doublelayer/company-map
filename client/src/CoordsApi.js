const API_URL_IP_TO_COORDINATES = "https://ipapi.co/json/";

export function getCityNameByLatitudeAndLongitude(coords) {
  return fetch(`https://www.geocode.xyz/${coords.latitude},${coords.longitude}?json=1`)
    .then(res => res.json())
    .then(result => {
      return {
        latitude: coords.latitude,
        longitude: coords.longitude,
        city: result.city
      };
    })
    .catch(error => console.warn(`ERROR(${error.code}) : ${error.message}`));
}

export function getCoordinatesByCityName(cityName) {
  return fetch(`https://www.geocode.xyz/${cityName}+de?json=1`)
    .then(res => res.json())
    .then(coords => {
      return {
        latitude: coords.latt,
        longitude: coords.longt,
        city: cityName
      };
    })
    .catch(error => console.warn(`ERROR(${error.code}) : ${error.message}`));
}

export function getCoordinatesFromIpAdress() {
  return fetch(API_URL_IP_TO_COORDINATES)
    .then(res => res.json())
    .then(location => {
      return location;
    })
    .catch(error => console.warn(`ERROR(${error.code}) : ${error.message}`));
}
