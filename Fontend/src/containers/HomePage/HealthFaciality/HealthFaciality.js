import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.scss";
import "./HealthFaciality.scss";

class HealthFaciality extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div className="HealthFaciality">
        <div className="container">
          <div className="info">
            <div className="heading">cơ sở y tế nổi bậc</div>
            <button className="more">xem thêm</button>
          </div>
          <div className="HealthFaciality-main">
            <Slider {...settings}>
              <div className="img-custom">
                <div className="box">
                  <div className="image" />
                  <h3 className="title">cơ sỏ 1</h3>
                </div>
              </div>

              <div className="img-custom">
                <div className="box">
                  <div className="image" />
                  <h3 className="title">Cơ Xương Khớp</h3>
                </div>
              </div>

              <div className="img-custom">
                <div className="box">
                  <div className="image" />
                  <h3 className="title">Cơ Xương Khớp</h3>
                </div>
              </div>

              <div className="img-custom">
                <div className="box">
                  <div className="image" />
                  <h3 className="title">Cơ Xương Khớp</h3>
                </div>
              </div>

              <div className="img-custom">
                <div className="box">
                  <div className="image" />
                  <h3 className="title">Cơ Xương Khớp</h3>
                </div>
              </div>

              <div className="img-custom">
                <div className="box">
                  <div className="image" />
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

export default connect(mapStateToProps, mapDispatchToProps)(HealthFaciality);
