import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.scss";
import "./Specialty.scss";
import specialtyImg from "../../../assets/specialty/xuongkhopchau.png";

class Specialty extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div className="Specialty">
        <div className="container">
          <div className="info">
            <div className="heading">chuyên khoa phổ biến</div>
            <button className="more">xem thêm</button>
          </div>
          <div className="Specialty-main">
            <Slider {...settings}>
              <div className="img-custom">
                <div className="box">
                  <img src={specialtyImg} className="image" />
                  <h3 className="title">Cơ Xương Khớp</h3>
                </div>
              </div>

              <div className="img-custom">
                <div className="box">
                  <img src={specialtyImg} className="image" />
                  <h3 className="title">Cơ Xương Khớp</h3>
                </div>
              </div>

              <div className="img-custom">
                <div className="box">
                  <img src={specialtyImg} className="image" />
                  <h3 className="title">Cơ Xương Khớp</h3>
                </div>
              </div>

              <div className="img-custom">
                <div className="box">
                  <img src={specialtyImg} className="image" />
                  <h3 className="title">Cơ Xương Khớp</h3>
                </div>
              </div>

              <div className="img-custom">
                <div className="box">
                  <img src={specialtyImg} className="image" />
                  <h3 className="title">Cơ Xương Khớp</h3>
                </div>
              </div>

              <div className="img-custom">
                <div className="box">
                  <img src={specialtyImg} className="image" />
                  <h3 className="title">Cơ Xương Khớp</h3>
                </div>
              </div>
            </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
