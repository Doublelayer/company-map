import L from "leaflet";

export const markerConfig = {
  User: L.icon({
    iconUrl: require("./markers/user.svg"),
    iconSize: [50, 82],
    popupAnchor: [0, -20]
  }),
  Informatik: L.icon({
    iconUrl: require("./markers/blue.svg"),
    iconSize: [50, 82],
    popupAnchor: [0, -20]
  }),
  Industrie_und_Maschinenbau: L.icon({
    iconUrl: require("./markers/red.svg"),
    iconSize: [50, 82],
    popupAnchor: [0, -20]
  })
};
