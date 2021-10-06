import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.scss";
import "./Advertisment.scss";
import AdvertismentImg from "../../../assets/advertisment/chungchi.png";

class Advertisment extends Component {
  render() {
    return (
      <div className="advertisment">
        <div className="container">
          <div className="advertisment-main">
            <div className="advertisment-main-box">
              <img src={AdvertismentImg} className="image" />
              <h3 className="title">100% bác sĩ được cấp phép</h3>
            </div>

            <div className="advertisment-main-box">
              <img src={AdvertismentImg} className="image" />
              <h3 className="title">100% bác sĩ được cấp phép</h3>
            </div>

            <div className="advertisment-main-box">
              <img src={AdvertismentImg} className="image" />
              <h3 className="title">100% bác sĩ được cấp phép</h3>
            </div>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Advertisment);
