import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.scss";
import "./OutstandingDoctor.scss";
import logoDoctor from "../../../assets/outstandingdoctor/logodoctor.png";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  handleViewDetailDoctor = (doctor) => {
    console.log("brodev view info:", doctor);
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);
    console.log("brodev check topDoctorRedux :", this.props.topDoctorRedux);
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
            <div className="heading">
              <FormattedMessage id="outstandingdoctor-home.title" />
            </div>
            <button className="more">
              <FormattedMessage id="outstandingdoctor-home.more-info" />
            </button>
          </div>
          <div className="OutstandingDoctor-container">
            <div className="OutstandingDoctor-container-content">
              <div className="subheading"></div>
              <h5>
                <FormattedMessage id="outstandingdoctor-home.desc" />
              </h5>
              <img src={logoDoctor} className="logo-image" />
            </div>
            <div className="OutstandingDoctor-container-main">
              <Slider {...settings}>
                {arrDoctors &&
                  arrDoctors.length > 0 &&
                  arrDoctors.map((item, index) => {
                    let imagabase64 = "";
                    if (item.image) {
                      imagabase64 = Buffer.from(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    let nameVi = `${item.positionData.valueVi},  ${item.firstName}  ${item.lastName}`;
                    let nameEn = `${item.positionData.valueEn},  ${item.firstName}  ${item.lastName}`;

                    return (
                      <div
                        className="img-custom"
                        key={index}
                        onClick={() => this.handleViewDetailDoctor(item)}
                      >
                        <div className="box">
                          <div
                            className="image"
                            style={{ backgroundImage: `url(${imagabase64})` }}
                          />
                          <h5 className="title-name">
                            <p className="doctorName">
                              {language === LANGUAGES.VI ? nameVi : nameEn}
                            </p>
                          </h5>
                          <p className="subtitle">
                            <FormattedMessage id="outstandingdoctor-home.doctor" />
                          </p>
                          <p className="subtitle">
                            {item.Doctor_Info.nameClinic}
                          </p>
                        </div>
                      </div>
                    );
                  })}
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
    topDoctorRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
);
