import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { setNewUserPositonBy } from "../../../utils/userPositionProvider";
import { storeAppData } from "../../../store/actions/appData";
import { toogleShowHide } from "../../../store/actions/showHide";
import { postTo } from "../../../api/post";
import { GET_DIVISIONS } from "../../../api/constants";
import { GET_LOCATIONS_BY_SECTOR_AND_DIVISION } from "../../../api/constants";
import { SEARCH_CITY_BY } from "../../../api/constants";

import BeatLoader from "react-spinners/BeatLoader";
import { throttle } from "throttle-debounce";

import { Button, Card, CardHeader, CardBody, CardText } from "reactstrap";
import Picky from "react-picky";

import "react-picky/dist/picky.css";
import "./queryModal.css";

export class QueryModal extends Component {
  constructor(props) {
    super(props);
    this.autocompleteSearchThrottled = throttle(500, this.autocompleteSearch);
    this.toggleSubmitFetchingIndicator = this.toggleSubmitFetchingIndicator.bind(this);
  }

  state = {
    submitFetchingIndicator: false,
    searchPending: false
  };

  searchCityByInput(input) {
    if (input.length !== 0) {
      this.autocompleteSearchThrottled(input);
    }
  }

  autocompleteSearch = q => {
    this.props.postTo(SEARCH_CITY_BY, "foundCitys", { input: q });
  };

  setNewUserPosition(value) {
    this.props.setNewUserPositonBy(value).then(() => {
      this.sectorSubmit();
    });
  }

  setSelectedSectorsOptions(options) {
    let payload = {
      data: options,
      tag: "selectedSectors"
    };
    this.props.storeAppData(payload);
    this.props.postTo(GET_DIVISIONS, "divisions", { sector: options });
    this.setSelectedDivisionsOptions([]);
  }

  setSelectedDivisionsOptions(options) {
    let payload = {
      data: options,
      tag: "selectedDivisions"
    };
    this.props.storeAppData(payload);
  }

  handleSectorChange(event) {
    this.setSelectedSectorsOptions(this.getSelectedOptionsAsArray(event));
  }

  handleDivisionChange(event) {
    this.setSelectedDivisionsOptions(this.getSelectedOptionsAsArray(event));
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

  toggleSubmitFetchingIndicator() {
    this.setState(prevState => ({
      submitFetchingIndicator: !prevState.submitFetchingIndicator
    }));
  }

  sectorSubmit() {
    this.toggleSubmitFetchingIndicator();
    const { city, selectedDivisions, selectedSectors } = this.props;

    const query = {
      city: city,
      sector: selectedSectors,
      division: selectedDivisions
    };

    this.props.postTo(GET_LOCATIONS_BY_SECTOR_AND_DIVISION, "markerData", query).then(() => {
      this.toggleSubmitFetchingIndicator();
      this.props.toogleShowHide();
    });
  }

  render() {
    const { submitFetchingIndicator } = this.state;
    const { city, isMobile, sectors, selectedSectors, divisions, selectedDivisions, toogleShowHide, foundCitys } = this.props;
    const sectorsAreSelected = selectedSectors.length > 0;
    const divisionsAreSelected = selectedDivisions.length > 0;
    return (
      <Card body className="search-form">
        {submitFetchingIndicator ? (
          <div className="api-fetching">
            <BeatLoader css={"text-align:center; padding-top:20px"} color={"#0066a6"} loading={true} />
            <em>Einen Augenblick bitte . . . </em>
          </div>
        ) : (
          <div>
            <CardHeader>Auswahl der Firmenbranche</CardHeader>
            <CardBody>
              <CardText>Schau dich in {city} um oder suche nach einer anderen Stadt.</CardText>
              <Picky
                id="picky-city"
                className="picky-selector"
                value={city}
                options={foundCitys}
                multiple={false}
                includeFilter={true}
                onChange={this.setNewUserPosition.bind(this)}
                getFilterValue={this.searchCityByInput.bind(this)}
                allSelectedPlaceholder={"Alle ausgewählt"}
                filterPlaceholder={"z.B.: Berlin"}
              />
              <CardText>Gesuchte Branche:</CardText>

              {isMobile ? (
                <select multiple onChange={this.handleSectorChange.bind(this)} value={selectedSectors}>
                  {sectors.map((sector, i) => (
                    <option key={i} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              ) : (
                <Picky
                  id="picky-sector"
                  className="picky-selector"
                  value={selectedSectors}
                  options={sectors}
                  multiple={true}
                  includeSelectAll={true}
                  includeFilter={true}
                  onChange={this.setSelectedSectorsOptions.bind(this)}
                  placeholder="Branche"
                  selectAllText="Alle auswählen"
                  numberDisplayed={0}
                  manySelectedPlaceholder={"%s ausgewählt"}
                  allSelectedPlaceholder={"Alle ausgewählt"}
                />
              )}
              <div>
                <CardText> Gesuchter Fachbereich:</CardText>
                {isMobile ? (
                  <select multiple onChange={this.handleDivisionChange.bind(this)} value={selectedDivisions} disabled={false}>
                    {divisions.map((division, i) => (
                      <option key={i} value={division}>
                        {division}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Picky
                    id="picky-divison"
                    className="picky-selector"
                    value={selectedDivisions}
                    disabled={!sectorsAreSelected}
                    options={divisions}
                    multiple={true}
                    includeSelectAll={true}
                    includeFilter={true}
                    onChange={this.setSelectedDivisionsOptions.bind(this)}
                    placeholder="Branche"
                    selectAllText="Alle auswählen"
                    numberDisplayed={0}
                    manySelectedPlaceholder={"%s ausgewählt"}
                    allSelectedPlaceholder={"Alle ausgewählt"}
                  />
                )}
              </div>
              <Button className="btn-form" onClick={this.sectorSubmit.bind(this)} disabled={!divisionsAreSelected}>
                Suchen
              </Button>
              <Button className="btn-form" onClick={toogleShowHide}>
                Abbrechen
              </Button>
            </CardBody>
          </div>
        )}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  isMobile: state.appConfigReducer.isMobile,
  pageIsLoading: state.loadingReducer.pageIsLoading,
  city: state.appDataReducer.userPosition.city,
  sectors: state.appDataReducer.sectors || [],
  selectedSectors: state.appDataReducer.selectedSectors || [],
  divisions: state.appDataReducer.divisions || [],
  selectedDivisions: state.appDataReducer.selectedDivisions || [],
  isfetching: state.fetchingReducer.pending,
  foundCitys: state.appDataReducer.foundCitys
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toogleShowHide: toogleShowHide,
      storeAppData: storeAppData,
      postTo: postTo,
      setNewUserPositonBy: setNewUserPositonBy
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryModal);
