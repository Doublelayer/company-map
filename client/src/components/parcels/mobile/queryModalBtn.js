import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import searchBtnImage from "../../../assets/images/search_btn.png";
import { toogleShowHide } from "../../../store/actions/showHide";

import "./queryModalBtn.css";

class QueryModalBtn extends Component {
  render() {
    const { toogleShowHide } = this.props;

    return <img className="search-mobile-button" src={searchBtnImage} onClick={toogleShowHide} alt="Suche" />;
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toogleShowHide: toogleShowHide
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(QueryModalBtn);
