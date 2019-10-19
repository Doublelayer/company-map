import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LoadingOverlay from "react-loading-overlay";

import { Footer, QueryModal, QueryModalBtn, InfoModal, CompanyMap } from "../componentExporter";

import { getFrom } from "../../api/get";
import { GET_SECTORS } from "../../api/constants";
import { setPageLoading } from "../../store/actions/loading";

import { findUserPosition } from "../../utils/userPositionProvider";

import { Logo } from "../../utils/ConsoleLogo";

import "./App.css";

class App extends React.Component {
  componentDidMount() {
    console.log(Logo);

    this.props
      .fetch(GET_SECTORS, "sectors")
      .then(() => this.props.findUserPosition())
      .then(() => this.props.setPageLoading(false));
  }

  render() {
    const { pageIsLoading, minimized } = this.props;

    return (
      <div className="container-app">
        <LoadingOverlay active={pageIsLoading} spinner text="Einen Augenblick bitte . . . ">
          <CompanyMap />
          {pageIsLoading ? null : (
            <div>
              <InfoModal />
              {pageIsLoading || minimized ? <QueryModal /> : null}
              <Footer />
              {!minimized ? <QueryModalBtn /> : null}
            </div>
          )}
        </LoadingOverlay>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pageIsLoading: state.loadingReducer.pageIsLoading,
  minimized: state.minimizedReducer,
  isMobile: state.appConfigReducer.isMobile
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetch: getFrom,
      findUserPosition: findUserPosition,
      setPageLoading: setPageLoading
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
