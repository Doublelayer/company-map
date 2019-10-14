const API_URL_COMPANIES =
  window.location.hostname === "localhost" ? "http://localhost:5000/api/v1/" : "https://company-map-api.doublelayer.now.sh/api/v1/";

export function loadAvailableSectors() {
  return fetch(`${API_URL_COMPANIES}companies/sectors`)
    .then(res => res.json())
    .then(sectors => {
      return sectors;
    })
    .catch(error => console.warn(`ERROR(${error.code}) : ${error.message}`));
}

export function getAllAvailableDivisionBySector(sector) {
  return fetch(`${API_URL_COMPANIES}companies/division`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ sector: sector })
  })
    .then(res => res.json())
    .then(foundSectors => {
      return foundSectors;
    })
    .catch(error => console.warn(`ERROR(${error.code}) : ${error.message}`));
}

export function findAllDocumentsBySectorAndDivision(query) {
  return fetch(`${API_URL_COMPANIES}companies/find-by-sector-and-division`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(query)
  })
    .then(res => res.json())
    .then(docs => {
      return docs;
    })
    .catch(error => console.warn(`ERROR(${error.code}) : ${error.message}`));
}

export function searchDistinctCityBy(input) {
  return fetch(`${API_URL_COMPANIES}city/searchcity`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ input: input })
  })
    .then(res => res.json())
    .then(citys => {
      return citys;
    })
    .catch(error => console.warn(`ERROR(${error.code}) : ${error.message}`));
}