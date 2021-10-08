import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.scss";
import "./Footer.scss";

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="container">
          <div className="Footer-row">
            <div className="Footer-row-info">
              <div className="image"></div>
              <h2>công ty 1 thành viên</h2>
              <h2>địa chỉ</h2>
              <p>
                Tầng 6, Tòa nhà FORD, 313-315 Trường Chinh, Thanh Xuân Hà Nội
              </p>
              <h2>số điện thoại</h2>
              <a href="">1900 638 367</a>
              <h2>email</h2>
              <a href="">isofhcare@isofhcare.com</a>
            </div>

            <div className="Footer-row-connect">
              <div className="Footer-title">liên kết</div>
              <h3>
                <a href="">Liên kết hợp tác</a>
              </h3>
              <h3>
                <a href="">Câu hỏi thường gặp</a>
              </h3>
              <h3>
                <a href="">Điều khoản sử dụng</a>
              </h3>
              <h3>
                <a href="">Chính sách bảo mật</a>
              </h3>
              <div className="certificate-notify"></div>
              <div className="certificate-register"></div>
            </div>

            <div className="Footer-row-appdown">
              <div className="Footer-title">tải app</div>
              <h2>
                Tải miễn phí ISOFHCARE - Ứng dụng đặt lịch khám online hàng đầu
              </h2>
              <h2>Quét QR code để</h2>
              <div className="qrcode"></div>
            </div>

            <div className="Footer-row-socials">
              <div className="Footer-title">mạng xã hội</div>
              <h2>
                FaceBook
                <a href="" className="Footer-row-socials-link">
                  <i className="fab fa-facebook"></i>
                </a>
              </h2>
              <h2>
                Instagram
                <a href="" className="Footer-row-socials-link">
                  <i className="fab fa-instagram"></i>
                </a>
              </h2>
              <h2>
                YouTube
                <a href="" className="Footer-row-socials-link">
                  <i className="fab fa-youtube"></i>
                </a>
              </h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
