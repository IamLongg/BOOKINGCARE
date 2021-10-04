import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderHome from "./Header/HeaderHome";

class HomePage extends Component {
  render() {
    return <HeaderHome />;
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
