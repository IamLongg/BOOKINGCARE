import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.scss";
import "./BannerHome.scss";
import BannerHomeImg1 from "../../../assets/banner/banner1.png";
import BannerHomeImg2 from "../../../assets/banner/banner2.png";
import BannerHomeImg3 from "../../../assets/banner/banner3.png";
import BannerHomeImg4 from "../../../assets/banner/banner4.png";
import BannerHomeImg5 from "../../../assets/banner/banner5.jpg";

class BannerHome extends Component {
  render() {
    let settingsBanner = this.props.settingsBanner;
    return (
      <div className="BannerHome">
        <div className="BannerHome-main">
          <Slider {...settingsBanner}>
            <div className="img-custom">
              <img src={BannerHomeImg1} className="image" />
            </div>

            <div className="img-custom">
              <img src={BannerHomeImg2} className="image" />
            </div>

            <div className="img-custom">
              <img src={BannerHomeImg3} className="image" />
            </div>

            <div className="img-custom">
              <img src={BannerHomeImg4} className="image" />
            </div>

            <div className="img-custom">
              <img src={BannerHomeImg5} className="image" />
            </div>
          </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(BannerHome);
