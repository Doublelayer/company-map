import React, { Component } from "react";
import { isMobile } from "react-device-detect";

import "react-picky/dist/picky.css";

import CompanyMap from "./parcels/map/companyMap";
import InfoModal from "./parcels/infoModal/infoModal";

import { throttle } from "throttle-debounce";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import BeatLoader from "react-spinners/BeatLoader";
import Picky from "react-picky";
import LoadingOverlay from "react-loading-overlay";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, CardText } from "reactstrap";

import searchBtnImage from "./search_btn.png";

import { useSelector, connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleInfoModal } from "./actions/index";
import { writeToConsol } from "./actions/testAction";

import {
  loadAvailableSectors,
  getAllAvailableDivisionBySector,
  findAllDocumentsBySectorAndDivision,
  searchDistinctCityBy
} from "./CompanyApi";
import { getCityNameByLatitudeAndLongitude, getCoordinatesByCityName, getCoordinatesFromIpAdress } from "./CoordsApi";
import { Logo } from "./ConsoleLogo";

import "./App.css";

const locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

class App extends Component {
  constructor(props) {
    super(props);

    this.autocompleteSearchThrottled = throttle(500, this.autocompleteSearch);
    this.setUserLocation = this.setUserLocation.bind(this);
    this.success = this.success.bind(this);
    this.getCurrentPositionError = this.getCurrentPositionError.bind(this);
    this.toggleInfoModal = this.toggleInfoModal.bind(this);
    this.sectorSubmit = this.sectorSubmit.bind(this);
    this.selectSectorOption = this.selectSectorOption.bind(this);
    this.selectCityOption = this.selectCityOption.bind(this);
    this.asyncSearchCitys = this.asyncSearchCitys.bind(this);
    this.togglePageIsLoading = this.togglePageIsLoading.bind(this);
    this.toggleApiIsFetchcing = this.toggleApiIsFetching.bind(this);
    this.toggleShowSearchFormAndSearchBtn = this.toggleShowSearchFormAndSearchBtn.bind(this);
    this.handleSectorChange = this.handleSectorChange.bind(this);
    this.handleDivisionChange = this.handleDivisionChange.bind(this);
    this.selectDivisonOption = this.selectDivisonOption.bind(this);
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
    divisionList: [],
    selectedDivisionArray: [],
    companies: [],
    selectedCity: [],
    citys: [],
    isSelectDivisonDisabled: true
  };

  componentDidMount() {
    console.log(Logo);

    this.props.dispatch(writeToConsol("hello world!"));
    this.props.dispatch(writeToConsol("hello Florin!"));

    // if (!isMobile) {
    //   navigator.geolocation.getCurrentPosition(this.success, this.getCurrentPositionError, locationOptions);
    // } else {
    //   this.getCurrentPositionError();
    // }
    // this.loadAvailableSectorsAndResetDivisions();
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
      this.props.dispatch(toggleInfoModal());
      this.togglePageIsLoading();
    });
  }

  loadAvailableSectorsAndResetDivisions() {
    loadAvailableSectors().then(sectors => {
      this.setState({
        sectorList: sectors,
        divisionList: []
      });
    });
  }

  autocompleteSearch = q => {
    searchDistinctCityBy(q).then(foundCitys => {
      this.setState({
        citys: foundCitys
      });
    });
  };

  asyncSearchCitys(input) {
    console.log(input.length);
    if (input.length !== 0) {
      this.autocompleteSearchThrottled(input);
    }
  }

  selectSectorOption(selectedSectors) {
    this.setState({ selectedSectorsArray: selectedSectors });
    getAllAvailableDivisionBySector(selectedSectors).then(division => {
      this.setState({
        divisionList: division
      });
    });
  }

  selectDivisonOption(division) {
    this.setState({ selectedDivisionArray: division });
  }

  handleSectorChange(event) {
    const selectedSectors = this.getSelectedOptionsAsArray(event);
    this.setState({ selectedSectorsArray: selectedSectors });
    this.selectSectorOption(selectedSectors);
  }

  handleDivisionChange(event) {
    const selectedDivisions = this.getSelectedOptionsAsArray(event);
    this.setState({ selectedDivisionArray: selectedDivisions });
  }

  getSelectedOptionsAsArray(event) {
    const options = event.target.options;
    const selectedValues = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    return selectedValues;
  }

  sectorSubmit() {
    this.toggleApiIsFetching();

    const query = {
      city: this.state.city,
      sector: this.state.selectedSectorsArray,
      division: this.state.selectedDivisionArray
    };

    findAllDocumentsBySectorAndDivision(query).then(documents => {
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

  togglePageIsLoading() {
    this.setState(prevState => ({
      pageIsLoading: !prevState.pageIsLoading
    }));
  }

  toggleShowSearchFormAndSearchBtn() {
    this.setState(prevState => ({
      showSearchForm: !prevState.showSearchForm,
      showSearchBtn: !prevState.showSearchBtn
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
      citys,
      divisionList,
      selectedDivisionArray
    } = this.state;

    const position = [this.state.location.latitude, this.state.location.longitude];
    const sectorIsSelected = selectedSectorsArray.length > 0;
    const divisonIsSelected = selectedDivisionArray.length > 0;

    return (
      <div className="container-app">
        <LoadingOverlay active={pageIsLoading} spinner text="Einen Augenblick bitte . . . ">
          <CompanyMap position={position} zoom={zoom} haveUserLoacation={haveUserLoacation} markerData={companies} />
          <InfoModal />
          {!pageIsLoading && showSearchForm ? (
            <div>
              <Card body className="search-form">
                {!apiFetching ? (
                  <div>
                    <CardHeader>Auswahl der Firmenbranche</CardHeader>
                    <CardBody>
                      <CardText>Schau dich in {selectedCity} um oder suche nach einer anderen Stadt.</CardText>
                      <Picky
                        id="picky-city"
                        className="picky-selector"
                        value={selectedCity}
                        options={citys}
                        multiple={false}
                        includeFilter={true}
                        onChange={this.selectCityOption}
                        getFilterValue={this.asyncSearchCitys}
                        allSelectedPlaceholder={"Alle ausgewählt"}
                        filterPlaceholder={"z.B.: Berlin"}
                      />
                      <CardText>Gesuchte Branche:</CardText>
                      {isMobile ? (
                        <div>
                          <select multiple onChange={this.handleSectorChange} value={selectedSectorsArray}>
                            {sectorList.map((sector, i) => (
                              <option key={i} value={sector}>
                                {sector}
                              </option>
                            ))}
                          </select>
                          <CardText>Gesuchter Fachbereich:</CardText>
                          <select multiple onChange={this.handleDivisionChange} value={selectedDivisionArray} disabled={!sectorIsSelected}>
                            {divisionList.map((sector, i) => (
                              <option key={i} value={sector}>
                                {sector}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div>
                          <Picky
                            id="picky-sector"
                            className="picky-selector"
                            value={selectedSectorsArray}
                            options={sectorList}
                            multiple={true}
                            includeSelectAll={true}
                            includeFilter={true}
                            onChange={this.selectSectorOption}
                            placeholder="Branche"
                            selectAllText="Alle auswählen"
                            numberDisplayed={0}
                            manySelectedPlaceholder={"%s ausgewählt"}
                            allSelectedPlaceholder={"Alle ausgewählt"}
                          />
                          <CardText>Gesuchter Fachbereich:</CardText>
                          <Picky
                            id="picky-divison"
                            className="picky-selector"
                            value={selectedDivisionArray}
                            options={divisionList}
                            multiple={true}
                            includeSelectAll={true}
                            includeFilter={true}
                            onChange={this.selectDivisonOption}
                            placeholder="Branche"
                            selectAllText="Alle auswählen"
                            numberDisplayed={0}
                            manySelectedPlaceholder={"%s ausgewählt"}
                            allSelectedPlaceholder={"Alle ausgewählt"}
                          />
                        </div>
                      )}
                      <Button className="btn-form" onClick={this.sectorSubmit} disabled={!divisonIsSelected || !sectorIsSelected}>
                        Suchen
                      </Button>
                      {isMobile ? (
                        <Button className="btn-form" onClick={this.toggleShowSearchFormAndSearchBtn}>
                          Abbrechen
                        </Button>
                      ) : (
                        ""
                      )}
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

export default connect()(App);
