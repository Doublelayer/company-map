import React, { Component } from "react";
import "./companyMap.css";
import { markerConfig } from "./MapMarkerConfig";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

export default class CompanyMap extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { position, zoom, haveUserLoacation, markerData } = this.props;

    return (
      <div className="map-container">
        <Map className="map" center={position} zoom={zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {haveUserLoacation ? <Marker position={position} icon={markerConfig.User}></Marker> : ""}

          {markerData.map(data => (
            <Marker key={data._id} position={[data.latitude, data.longitude]} icon={markerConfig[data.sector.replace(/\s/g, "_")]}>
              <Popup>
                <a href={data.homepage} target="_blank" rel="noopener noreferrer">
                  {data.name}
                </a>
                <br />
                Branche: {data.sector}
                <br />
                {data.street} {data.housenumber}
                <br />
                Gegründet: {data.founding_date}
              </Popup>
            </Marker>
          ))}
        </Map>
      </div>
    );
  }
}
