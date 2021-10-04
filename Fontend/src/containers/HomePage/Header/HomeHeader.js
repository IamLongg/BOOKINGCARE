import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
class HomeHeader extends Component {
  render() {
    return (
      <>
        <div className="home-header-container">
          <div className="header-logo"></div>
          <div className="header-navbar">
            <ul>
              <li>
                {" "}
                <a href="#">
                  <FormattedMessage id="homeheader.homepage" />
                </a>
              </li>
              <li>
                {" "}
                <a href="#">
                  <FormattedMessage id="homeheader.speciality" />
                </a>
              </li>
              <li>
                {" "}
                <a href="#">
                  <FormattedMessage id="homeheader.health-facilities" />
                </a>
              </li>
              <li>
                {" "}
                <a href="#">
                  <FormattedMessage id="homeheader.handbook" />
                </a>
              </li>
              <li>
                {" "}
                <a href="#">
                  <FormattedMessage id="homeheader.cooperation-contact" />
                </a>
              </li>
            </ul>
          </div>
          <div className="header-language">
            <div className="flag">
              <span className=" language-vi">VN</span>
              <span className=" language-en">EN</span>
            </div>
          </div>
        </div>
        <div className="home-banner">
          <div className="container">
            <div className="home-banner-main">
              <h3>
                <FormattedMessage id="homebanner.finddoctor" />
              </h3>
              <p className="desc">
                <FormattedMessage id="homebanner.descbanner" />
              </p>
              <div className="home-banner-main-search">
                <input
                  type="text"
                  className="input-search"
                  placeholder="Tìm chuyên khoa khám bệnh . . ."
                />
                <span className="btn-search">
                  <i className="fas fa-search"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
