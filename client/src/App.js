import React, { Component } from "react";

import "react-picky/dist/picky.css";

import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import BeatLoader from "react-spinners/BeatLoader";
import Picky from "react-picky";
import LoadingOverlay from "react-loading-overlay";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, CardText } from "reactstrap";

import mapMarker from "./map-marker.svg";
import userMarker from "./user-marker.svg";

import { getCompanySectors, getAllDocumentsBySector, searchDistinctCityBy } from "./CompanyApi";
import { getCityNameByLatitudeAndLongitude, getCoordinatesByCityName, getCoordinatesFromIpAdress } from "./CoordsApi";

import "./App.css";

const marker = L.icon({
  iconUrl: mapMarker,
  iconSize: [50, 82],
  popupAnchor: [0, -20]
});

const user = L.icon({
  iconUrl: userMarker,
  iconSize: [50, 82],
  popupAnchor: [0, -20]
});

const mapOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.setUserLocation = this.setUserLocation.bind(this);
    this.success = this.success.bind(this);
    this.getCurrentPositionError = this.getCurrentPositionError.bind(this);
    this.toggleInfoModal = this.toggleInfoModal.bind(this);
    this.sectorSubmit = this.sectorSubmit.bind(this);
    this.selectMultipleOption = this.selectMultipleOption.bind(this);
    this.selectCityOption = this.selectCityOption.bind(this);
    this.asyncSearchCitys = this.asyncSearchCitys.bind(this);
  }

  state = {
    pageIsLoading: true,
    apiFetching: false,
    modal: false,
    location: {
      latitude: 0,
      longitude: 0
    },
    city: null,
    haveUserLoacation: false,
    zoom: 2,
    sectorList: [],
    selectedSectorsArray: [],
    companies: [],
    selectedCity: [],
    citys: []
  };

  sectorSubmit() {
    const query = {
      city: this.state.city,
      sectors: this.state.selectedSectorsArray
    };

    getAllDocumentsBySector(query).then(documents => {
      this.setState({
        companies: documents,
        apiFetching: false
      });
    });
  }

  toggleInfoModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  setUserLocation(location) {
    this.setState({
      location: {
        latitude: location.latitude,
        longitude: location.longitude
      },
      city: location.city,
      selectedCity: location.city,
      haveUserLoacation: true,
      zoom: 14
    });
  }

  success(location) {
    getCityNameByLatitudeAndLongitude(location.coords).then(resolvedLocation => {
      this.setUserLocation(resolvedLocation);
      this.setState({});
    });
  }

  getCurrentPositionError() {
    getCoordinatesFromIpAdress().then(location => {
      this.setUserLocation(location);
      this.setState({
        modal: true
      });
      this.forceUpdate();
    });
  }

  async componentDidMount() {
    await Promise.all([
      navigator.geolocation.getCurrentPosition(this.success, this.getCurrentPositionError, mapOptions),
      getCompanySectors().then(sectors => {
        this.setState({
          sectorList: sectors
        });
      })
    ]).then(() => {
      this.setState({
        pageIsLoading: false
      });
    });
  }

  selectMultipleOption(value) {
    this.setState({ selectedSectorsArray: value });
  }

  selectCityOption(value) {
    this.setState({ selectedCity: value, pageIsLoading: true });

    getCoordinatesByCityName(value)
      .then(location => {
        this.setUserLocation(location);
        this.sectorSubmit();
      })
      .then(() => {
        this.setState({
          pageIsLoading: false
        });
      });
  }

  asyncSearchCitys(input) {
    if (input.length >= 2) {
      searchDistinctCityBy(input).then(foundCitys => {
        this.setState({
          citys: foundCitys
        });
      });
    }
  }

  render() {
    const {
      sectorList,
      selectedSectorsArray,
      companies,
      modal,
      haveUserLoacation,
      zoom,
      pageIsLoading,
      apiFetching,
      selectedCity,
      citys
    } = this.state;
    const position = [this.state.location.latitude, this.state.location.longitude];
    const readyToQuery = selectedSectorsArray.length > 0;

    return (
      <div>
        <LoadingOverlay className="map-container" active={pageIsLoading} spinner text="Einen Augenblick bitte . . . ">
          <Map className="map" center={position} zoom={zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {haveUserLoacation ? <Marker position={position} icon={user}></Marker> : ""}
            {companies.map(companies => (
              <Marker key={companies._id} position={[companies.latitude, companies.longitude]} icon={marker}>
                <Popup>
                  <a href={companies.homepage} target="_blank">
                    {companies.name}
                  </a>
                  <br />
                  {companies.street} {companies.housenumber}
                </Popup>
              </Marker>
            ))}
          </Map>
          <Modal isOpen={modal} toggleInfoModal={this.toggleInfoModal}>
            <ModalHeader toggleInfoModal={this.toggleInfoModal}>Hinweis zur Standortermittlung</ModalHeader>
            <ModalBody>Du hast die Standortermittlung nicht erlaubt. Dein Standort wurde anhand deiner IP-Adresse ermittelt!</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggleInfoModal}>
                Okay
              </Button>
            </ModalFooter>
          </Modal>
          {!pageIsLoading ? (
            <Card body className="search-form">
              <CardHeader>Auswahl der Firmenbranche</CardHeader>
              <CardBody>
                <CardText>Suche nach einer anderen Stadt.</CardText>
                {!apiFetching ? (
                  <div>
                    <Picky
                      id="picky-city"
                      value={selectedCity}
                      options={citys}
                      multiple={false}
                      includeFilter={true}
                      onChange={this.selectCityOption}
                      getFilterValue={this.asyncSearchCitys}
                      allSelectedPlaceholder={"Alle ausgewählt"}
                      filterPlaceholder={"z.B.: Berlin"}
                    />
                    <CardText>Bitte wähle deine gesuchte Branche aus.</CardText>
                    <Picky
                      id="picky-sector"
                      value={selectedSectorsArray}
                      options={sectorList}
                      multiple={true}
                      includeSelectAll={true}
                      includeFilter={true}
                      onChange={this.selectMultipleOption}
                      placeholder="Branche"
                      selectAllText="Alle auswählen"
                      numberDisplayed={0}
                      manySelectedPlaceholder={"%s ausgewählt"}
                      allSelectedPlaceholder={"Alle ausgewählt"}
                    />
                    <Button className="btn-form" onClick={this.sectorSubmit} disabled={!readyToQuery}>
                      Suchen
                    </Button>
                  </div>
                ) : (
                  <BeatLoader css={"text-align:center; padding-top:20px"} color={"#0066a6"} loading={true} />
                )}
              </CardBody>
            </Card>
          ) : (
            ""
          )}
        </LoadingOverlay>
      </div>
    );
  }
}
