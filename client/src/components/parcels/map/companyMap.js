import React, { Component } from "react";
import { connect } from "react-redux";
import { markerConfig } from "./MapMarkerConfig";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";

import "./companyMap.css";

class CompanyMap extends Component {
  render() {
    const { userPosition, haveUserLoacation, markerData } = this.props;

    return (
      <div className="map-container">
        <Map className="map" center={userPosition} zoom={14}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {haveUserLoacation ? <Marker position={userPosition} icon={markerConfig.User}></Marker> : ""}
          <MarkerClusterGroup>
            {markerData.map(data => (
              <Marker key={data._id} position={[data.latitude, data.longitude]} icon={markerConfig[data.sector.replace(/\s/g, "_")]}>
                <Popup>
                  <div>
                    <a href={data.homepage} target="_blank" rel="noopener noreferrer">
                      {data.name}
                    </a>
                    <br />
                    Branche: {data.sector}
                    <br />
                    {data.street} {data.housenumber}
                    <br />
                    Gegründet: {data.founding_date}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </Map>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  haveUserLoacation: state.appDataReducer.userPosition.haveUserLoacation,
  userPosition: [state.appDataReducer.userPosition.latitude, state.appDataReducer.userPosition.longitude],
  markerData: state.appDataReducer.markerData || []
});

export default connect(mapStateToProps)(CompanyMap);
