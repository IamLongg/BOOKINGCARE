import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.scss";
import "./Advertisment.scss";
import AdvertismentImg from "../../../assets/advertisment/chungchi.png";
import AdvertismentImg1 from "../../../assets/advertisment/time.png";
import AdvertismentImg2 from "../../../assets/advertisment/danhgia.png";

class Advertisment extends Component {
  render() {
    return (
      <div className="advertisment">
        <div className="container">
          <div className="advertisment-main">
            <div className="advertisment-main-box">
              <img src={AdvertismentImg} className="image" />
              <h3 className="title">
                <FormattedMessage id="advertisment-home.title1" />
              </h3>
            </div>

            <div className="advertisment-main-box">
              <img src={AdvertismentImg1} className="image" />
              <h3 className="title">
                <FormattedMessage id="advertisment-home.title2" />
              </h3>
            </div>

            <div className="advertisment-main-box">
              <img src={AdvertismentImg2} className="image" />
              <h3 className="title">
                <FormattedMessage id="advertisment-home.title3" />
              </h3>
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
