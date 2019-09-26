import React, { Component } from "react";
import { isMobile } from "react-device-detect";

import "react-picky/dist/picky.css";

import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import BeatLoader from "react-spinners/BeatLoader";
import Picky from "react-picky";
import LoadingOverlay from "react-loading-overlay";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, CardText } from "reactstrap";

import mapMarker from "./map-marker.svg";
import userMarker from "./user-marker.svg";
import searchBtnImage from "./search_btn.png";

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

const locationOptions = {
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
    this.togglePageIsLoading = this.togglePageIsLoading.bind(this);
    this.toggleApiIsFetchcing = this.toggleApiIsFetching.bind(this);
    this.toggleShowSearchFormAndSearchBtn = this.toggleShowSearchFormAndSearchBtn.bind(this);
    this.handleSectorChange = this.handleSectorChange.bind(this);
  }

  state = {
    pageIsLoading: true,
    apiFetching: false,
    isMobile: isMobile,
    showSearchBtn: isMobile,
    showSearchForm: !isMobile,
    modal: false,
    notshowSearchForm: false,
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
    this.toggleApiIsFetching();

    const query = {
      city: this.state.city,
      sectors: this.state.selectedSectorsArray
    };

    getAllDocumentsBySector(query).then(documents => {
      this.setState({
        companies: documents
      });
      this.toggleApiIsFetching();
      this.toggleShowSearchFormAndSearchBtn();
    });
  }

  toggleInfoModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleApiIsFetching() {
    this.setState(prevState => ({
      apiFetching: !prevState.apiFetching
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

  togglePageIsLoading() {
    this.setState(prevState => ({
      pageIsLoading: !prevState.pageIsLoading
    }));
  }

  success(location) {
    getCityNameByLatitudeAndLongitude(location.coords).then(resolvedLocation => {
      this.setUserLocation(resolvedLocation);
      this.togglePageIsLoading();
    });
  }

  getCurrentPositionError() {
    getCoordinatesFromIpAdress().then(location => {
      this.setUserLocation(location);
      this.setState({
        modal: true
      });
      this.togglePageIsLoading();
    });
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.success, this.getCurrentPositionError, locationOptions);

    getCompanySectors().then(sectors => {
      this.setState({
        sectorList: sectors
      });
    });
  }

  selectMultipleOption(value) {
    this.setState({ selectedSectorsArray: value });
  }

  selectCityOption(value) {
    this.setState({ selectedCity: value });
    this.togglePageIsLoading();

    getCoordinatesByCityName(value)
      .then(location => {
        this.setUserLocation(location);
        this.sectorSubmit();
      })
      .then(() => {
        this.togglePageIsLoading();
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

  toggleShowSearchFormAndSearchBtn() {
    this.setState(prevState => ({
      showSearchForm: !prevState.showSearchForm,
      showSearchBtn: !prevState.showSearchBtn
    }));
  }

  handleSectorChange(event) {
    const options = event.target.options;
    const selectedArray = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedArray.push(options[i].value);
      }
    }
    this.setState({ selectedSectorsArray: selectedArray });
  }

  render() {
    const {
      isMobile,
      showSearchBtn,
      showSearchForm,
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
                  <a href={companies.homepage} target="_blank" rel="noopener noreferrer">
                    {companies.name}
                  </a>
                  <br />
                  {companies.street} {companies.housenumber}
                </Popup>
              </Marker>
            ))}
          </Map>
          <Modal isOpen={modal}>
            <ModalHeader>Hinweis zur Standortermittlung</ModalHeader>
            <ModalBody>Du hast die Standortermittlung nicht erlaubt. Dein Standort wurde anhand deiner IP-Adresse ermittelt!</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggleInfoModal}>
                Okay
              </Button>
            </ModalFooter>
          </Modal>
          {!pageIsLoading && showSearchForm ? (
            <div>
              <Card body className="search-form">
                {!apiFetching ? (
                  <div>
                    <CardHeader>Auswahl der Firmenbranche</CardHeader>
                    <CardBody>
                      <CardText>Suche nach einer anderen Stadt.</CardText>
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
                      {isMobile ? (
                        <select multiple onChange={this.handleSectorChange} value={selectedSectorsArray}>
                          {sectorList.map((sector, i) => (
                            <option key={i} value={sector}>
                              {sector}
                            </option>
                          ))}
                        </select>
                      ) : (
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
                      )}
                      <Button className="btn-form" onClick={this.sectorSubmit} disabled={!readyToQuery}>
                        Suchen
                      </Button>
                    </CardBody>
                  </div>
                ) : (
                  <div className="api-fetching">
                    <BeatLoader css={"text-align:center; padding-top:20px"} color={"#0066a6"} loading={true} />
                    <em>Einen Augenblick bitte . . . </em>
                  </div>
                )}
              </Card>
            </div>
          ) : (
            ""
          )}
          <Card className="footer">
            <CardText>
              {" "}
              Made with{" "}
              <span role="img" aria-label="love">
                💚
              </span>{" "}
              by{" "}
              <a href="https://github.com/Doublelayer" target="_blank" rel="noopener noreferrer">
                Doublelayer
              </a>
            </CardText>
          </Card>
          {showSearchBtn ? (
            <img className="search-mobile-button" src={searchBtnImage} onClick={this.toggleShowSearchFormAndSearchBtn} alt="Suche" />
          ) : (
            ""
          )}
        </LoadingOverlay>
      </div>
    );
  }
}
