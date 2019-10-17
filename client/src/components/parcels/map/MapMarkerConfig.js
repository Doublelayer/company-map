import L from "leaflet";

export const markerConfig = {
  User: L.icon({
    iconUrl: require("../../../assets/markers/user.svg"),
    iconSize: [50, 82],
    popupAnchor: [0, -20]
  }),
  Informatik: L.icon({
    iconUrl: require("../../../assets/markers/blue.svg"),
    iconSize: [50, 82],
    popupAnchor: [0, -20]
  }),
  Industrie_und_Maschinenbau: L.icon({
    iconUrl: require("../../../assets/markers/red.svg"),
    iconSize: [50, 82],
    popupAnchor: [0, -20]
  }),
  Automobil_und_Fahrzeugbau: L.icon({
    iconUrl: require("../../../assets/markers/green.svg"),
    iconSize: [50, 82],
    popupAnchor: [0, -20]
  }),
  Transport_und_Logistik: L.icon({
    iconUrl: require("../../../assets/markers/yellow.svg"),
    iconSize: [50, 82],
    popupAnchor: [0, -20]
  }),
  Pharma_und_Medizintechnik: L.icon({
    iconUrl: require("../../../assets/markers/cyan.svg"),
    iconSize: [50, 82],
    popupAnchor: [0, -20]
  })
};
