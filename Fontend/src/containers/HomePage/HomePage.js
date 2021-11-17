import React, { Component } from "react";
import { connect } from "react-redux";
import "../../styles/styles.scss";

import HomeHeader from "./Header/HomeHeader";
import Specialty from "./Specialty/Specialty";
import Advertisment from "./Advertisment/Advertisment";
import BannerHome from "./Banner/BannerHome";
import HealthFaciality from "./HealthFaciality/HealthFaciality";
import OutstandingDoctor from "./OutstandingDoctor/OutstandingDoctor";
import HandBook from "./HandBook/HandBook";
import About from "./About/About";
import Footer from "./Footer/Footer";
import LandingPage from "./Map/LandingPage";

class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    let settingsBanner = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
    };
    return (
      <div>
        <HomeHeader isShowSearch={true} />
        <Specialty settings={settings} />
        <Advertisment />
        <BannerHome settingsBanner={settingsBanner} />
        <HealthFaciality />
        <OutstandingDoctor />
        <HandBook />
        <About />
        <LandingPage />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
