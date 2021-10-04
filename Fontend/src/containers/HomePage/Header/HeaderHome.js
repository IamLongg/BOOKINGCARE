import React, { Component } from "react";
import { connect } from "react-redux";
import "./HeaderHome.scss";
class HeaderHome extends Component {
  render() {
    return (
      <div className="home-header-container">
        <div className="header-logo"></div>
        <div className="header-navbar">
          <ul>
            <li>
              {" "}
              <a href="#">Trang Chủ</a>
            </li>
            <li>
              {" "}
              <a href="#">Chuyên Khoa</a>
            </li>
            <li>
              {" "}
              <a href="#">Cơ Sở Y Tế</a>
            </li>
            <li>
              {" "}
              <a href="#">Bác Sĩ</a>
            </li>
            <li>
              {" "}
              <a href="#">Gói Khám</a>
            </li>
          </ul>
        </div>
        <div className="header-language">
          <div className="flag">
            <a href="">VN</a>
            <a href="">EN</a>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHome);
