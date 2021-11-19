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
              <h2>
                <FormattedMessage id="footer-page.company" />
              </h2>
              <h2>
                <FormattedMessage id="footer-page.address" />
              </h2>
              <p>
                <FormattedMessage id="footer-page.addressInfo" />
              </p>
              <h2>
                <FormattedMessage id="footer-page.phone" />
              </h2>
              <a href="">
                <FormattedMessage id="footer-page.phoneInfo" />
              </a>
              <h2>
                <FormattedMessage id="footer-page.email" />
              </h2>
              <a href="">
                <FormattedMessage id="footer-page.emailInfo" />
              </a>
            </div>

            <div className="Footer-row-connect">
              <div className="Footer-title">
                <FormattedMessage id="footer-page.link" />
              </div>
              <h3>
                <a href="">
                  <FormattedMessage id="footer-page.link1" />
                </a>
              </h3>
              <h3>
                <a href="">
                  <FormattedMessage id="footer-page.link2" />
                </a>
              </h3>
              <h3>
                <a href="">
                  <FormattedMessage id="footer-page.link3" />
                </a>
              </h3>
              <h3>
                <a href="">
                  <FormattedMessage id="footer-page.link4" />
                </a>
              </h3>
              <div className="certificate-notify"></div>
              <div className="certificate-register"></div>
            </div>

            <div className="Footer-row-appdown">
              <div className="Footer-title">
                <FormattedMessage id="footer-page.downloadApp" />
              </div>
              <h2>
                <FormattedMessage id="footer-page.downloadAppInfo" />
              </h2>
              <h2>
                <FormattedMessage id="footer-page.qr" />
              </h2>
              <div className="qrcode"></div>
            </div>

            <div className="Footer-row-socials">
              <div className="Footer-title">
                <FormattedMessage id="footer-page.socials" />
              </div>
              <h2>
                FaceBook
                <a
                  href="https://www.facebook.com/B%E1%BB%87nh-vi%E1%BB%87n-Isofhcare-108849608268818/?ref=pages_you_manage"
                  target="_blank"
                  className="Footer-row-socials-link"
                >
                  <i className="fab fa-facebook"></i>
                </a>
              </h2>
              <h2>
                Instagram
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  className="Footer-row-socials-link"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </h2>
              <h2>
                YouTube
                <a
                  href="https://www.youtube.com/watch?v=QPjg4QJEtUg"
                  target="_blank"
                  className="Footer-row-socials-link"
                >
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
