import React, { createRef, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { markerConfig } from './MapMarkerConfig';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import { toogleGroupedMarkers } from '../../../store/actions/showHide';

import 'react-leaflet-markercluster/dist/styles.min.css';

import './companyMap.css';

class CompanyMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = createRef();
    this.groupRef = createRef();
  }

  componentDidUpdate(prevProps) {
    this.props.markerData !== prevProps.markerData && this.mapFitBounds();
  }

  mapFitBounds() {
    const { mapRef, markerData } = this.props;
    if (this.props.markerData.length > 0) {
      const map = mapRef.current.leafletElement;
      const res = markerData.map(data => ({ lat: data.latitude, lng: data.longitude }));
      map.animate = true;
      map.fitBounds(res);
    }
  }

  render() {
    const { userPosition, haveUserLoacation, markerData, toogleGroupedMarkers, showGroupedMarkers } = this.props;
    const ShowGroupedMarkers = showGroupedMarkers ? MarkerClusterGroup : 'div';
    const groupedControlImg = showGroupedMarkers
      ? 'https://www.pinclipart.com/picdir/middle/46-460577_maps-vector-graphic-google-maps-icon-android-clipart.png'
      : 'https://i.stack.imgur.com/g1erW.png';

    return (
      <div className="map-container">
        <Map className="map" center={userPosition} zoom={12} ref={this.mapRef} render={console.log('asdfa')}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {haveUserLoacation ? <Marker position={userPosition} icon={markerConfig.User}></Marker> : ''}

          <ShowGroupedMarkers ref={this.groupRef}>
            {markerData.map(data => (
              <Marker key={data._id} position={[data.latitude, data.longitude]} icon={markerConfig[data.sector.replace(/\s/g, '_')]}>
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
          </ShowGroupedMarkers>
        </Map>
        <img src={groupedControlImg} alt="" className="map-control" onClick={toogleGroupedMarkers} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  haveUserLoacation: state.appDataReducer.userPosition.haveUserLoacation,
  userPosition: [state.appDataReducer.userPosition.latitude, state.appDataReducer.userPosition.longitude],
  markerData: state.appDataReducer.markerData || [],
  showGroupedMarkers: state.appConfigReducer.groupedMarkers
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toogleGroupedMarkers: toogleGroupedMarkers
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CompanyMap);
