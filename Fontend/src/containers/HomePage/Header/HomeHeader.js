import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import { withRouter } from "react-router";
import { MenuItems } from "./Navbar/MenuItems";
import { Button } from "./Button";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  state = {
    clicked: false,
  };

  handleReturnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked,
    });
  };
  render() {
    let language = this.props.language;
    return (
      <>
        <div className="home-header-container">
          <div
            className="header-logo"
            onClick={() => this.handleReturnToHome()}
          ></div>
          <div className="header-navbar">
            <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
              {MenuItems &&
                MenuItems.length > 0 &&
                MenuItems.map((item, index) => {
                  return (
                    <li key={index}>
                      {" "}
                      <a
                        className={item.cName}
                        href={item.url}
                        onClick={() => this.handleReturnToHome()}
                      >
                        {item.title}
                      </a>
                    </li>
                  );
                })}
            </ul>
            <div className="menu-icons " onClick={this.handleClick}>
              <i
                className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
              ></i>
            </div>
          </div>

          {/* <div className="header-language">
            <div className="flag">
              <div
                className="language-vi"
                onClick={() => {
                  this.changeLanguage(LANGUAGES.VI);
                }}
              ></div>
              <div
                className="language-en"
                onClick={() => {
                  this.changeLanguage(LANGUAGES.EN);
                }}
              ></div>
            </div>
          </div> */}
        </div>

        {this.props.isShowSearch === true && (
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
                    disabled
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
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
