const BASE_URL =
  window.location.hostname === "localhost" ? "http://localhost:5000/api/v1/" : "https://company-map-api.doublelayer.now.sh/api/v1/";
export const API_URL_COMPANIES = BASE_URL;
export const GET_SECTORS = `${API_URL_COMPANIES}companies/sectors`;
export const GET_DIVISIONS = `${API_URL_COMPANIES}companies/division`;
export const GET_LOCATIONS_BY_SECTOR_AND_DIVISION = `${API_URL_COMPANIES}companies/find-by-sector-and-division`;
