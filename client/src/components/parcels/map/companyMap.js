import React, { Component } from "react";
import { connect } from "react-redux";
import { markerConfig } from "./MapMarkerConfig";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import "./companyMap.css";

class CompanyMap extends Component {
  render() {
    const { userPosition, zoom, haveUserLoacation, markerData } = this.props;

    return (
      <div className="map-container">
        <Map className="map" center={userPosition} zoom={zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {haveUserLoacation ? <Marker position={userPosition} icon={markerConfig.User}></Marker> : ""}

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
const mapStateToProps = state => ({
  haveUserLoacation: state.appDataReducer.userPosition.haveUserLoacation,
  userPosition: [state.appDataReducer.userPosition.latitude, state.appDataReducer.userPosition.longitude],
  zoom: state.locationReducer.zoom,
  markerData: state.appDataReducer.markerData || []
});

export default connect(mapStateToProps)(CompanyMap);
