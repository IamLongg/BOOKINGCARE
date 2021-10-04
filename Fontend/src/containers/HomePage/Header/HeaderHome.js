import React, { Component } from "react";
import { connect } from "react-redux";
import "./HeaderHome.scss";
class HeaderHome extends Component {
  render() {
    return (
      <>
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
            </div>
          </div>
        </div>
        <div className="home-banner">
          <div className="home-baner-container">
            <h3>Tìm bác sĩ- bệnh viện dễ dàng hơn</h3>
            <p>Chủ động đặt lịch hẹn thông minh và được chăm sóc tận tình</p>
            <div className="home-baner-serch">
              <input
                type="text"
                className="input-serch"
                placeholder="Nhập tên bác sĩ, bệnh viện, dịch vụ"
              />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHome);
