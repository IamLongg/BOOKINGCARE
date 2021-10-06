import React, { Component } from "react";
import { connect } from "react-redux";
import "../../styles/styles.scss";
import HomeHeader from "./Header/HomeHeader";
import Specialty from "./Specialty/Specialty";
import Advertisment from "./Advertisment/Advertisment";
class HomePage extends Component {
  render() {
    return (
      <div>
        <HomeHeader />
        <Specialty />
        <Advertisment />
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
