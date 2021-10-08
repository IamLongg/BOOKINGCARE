import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.scss";
import "./OutstandingDoctor.scss";
import logoDoctor from "../../../assets/outstandingdoctor/logodoctor.png";

class OutstandingDoctor extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };
    return (
      <div className="OutstandingDoctor">
        <div className="container">
          <div className="info">
            <div className="heading">bác sĩ nổi bậc</div>
            <button className="more">xem thêm</button>
          </div>
          <div className="OutstandingDoctor-container">
            <div className="OutstandingDoctor-container-content">
              <div className="subheading"></div>
              <h5>
                Đặt khám trực tiếp tới đội ngũ bác sĩ của ISOFHCARE có trình độ
                chuyên môn cao, nhiều năm kinh nghiệm, giàu y đức, giúp bạn hoàn
                toàn chủ động lựa chọn thời gian khám
              </h5>
              <img src={logoDoctor} className="logo-image" />
            </div>
            <div className="OutstandingDoctor-container-main">
              <Slider {...settings}>
                <div className="img-custom">
                  <div className="box">
                    <div className="image" />
                    <h3 className="title-name">Ths.BSNT Đỗ Thị Dung</h3>
                    <p className="subtitle">bác sĩ ơi</p>
                    <p className="subtitle">chuyên khoa tai mũi họng</p>
                  </div>
                </div>
                <div className="img-custom">
                  <div className="box">
                    <div className="image" />
                    <h3 className="title-name">Ths.BSNT Đỗ Thị Dung</h3>
                    <p className="subtitle">bác sĩ ơi</p>
                    <p className="subtitle">chuyên khoa tai mũi họng</p>
                  </div>
                </div>
                <div className="img-custom">
                  <div className="box">
                    <div className="image" />
                    <h3 className="title-name">Ths.BSNT Đỗ Thị Dung</h3>
                    <p className="subtitle">bác sĩ ơi</p>
                    <p className="subtitle">chuyên khoa tai mũi họng</p>
                  </div>
                </div>
                <div className="img-custom">
                  <div className="box">
                    <div className="image" />
                    <h3 className="title-name">Ths.BSNT Đỗ Thị Dung</h3>
                    <p className="subtitle">bác sĩ ơi</p>
                    <p className="subtitle">chuyên khoa tai mũi họng</p>
                  </div>
                </div>
                <div className="img-custom">
                  <div className="box">
                    <div className="image" />
                    <h3 className="title-name">Ths.BSNT Đỗ Thị Dung</h3>
                    <p className="subtitle">bác sĩ ơi</p>
                    <p className="subtitle">chuyên khoa tai mũi họng</p>
                  </div>
                </div>
              </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
