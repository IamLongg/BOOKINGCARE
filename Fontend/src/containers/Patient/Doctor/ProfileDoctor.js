import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../utils";
import { getProfileDoctor } from "../../../services/userService";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInfoDoctor(this.props.doctorID);
    this.setState({
      dataProfile: data,
    });
  }

  getInfoDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctor(id);
      if (res && res.data.errCode === 0) {
        result = res.data.data;
      }
    }
    return result;
  };

  async componentDidUpdate(preProps, prevState, snapshot) {
    if (this.props.language !== preProps.language) {
    }
    if (this.props.doctorID !== preProps.doctorID) {
      //   this.getInfoDoctor(this.props.doctorID);
    }
  }

  renderTimeBooking = (dataTimeScheduleModal) => {
    let { language } = this.props;
    if (dataTimeScheduleModal && !_.isEmpty(dataTimeScheduleModal)) {
      let time =
        language === LANGUAGES.VI
          ? dataTimeScheduleModal.timeTypeData.valueVi
          : dataTimeScheduleModal.timeTypeData.valueEn;
      return (
        <>
          <div>
            <span>
              <FormattedMessage id="book-modal.timeBookModal" />
            </span>{" "}
            {time}
          </div>
        </>
      );
    }
  };

  renderDateBooking = (dataTimeScheduleModal) => {
    let { language } = this.props;
    if (dataTimeScheduleModal && !_.isEmpty(dataTimeScheduleModal)) {
      let date =
        language === LANGUAGES.VI
          ? moment
              .unix(+dataTimeScheduleModal.date / 1000)
              .format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTimeScheduleModal.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div style={{ textTransform: "capitalize" }}>
            <span>
              <FormattedMessage id="book-modal.dateBookModal" />
            </span>{" "}
            {date}
          </div>
        </>
      );
    }
  };

  render() {
    let { dataProfile } = this.state;
    let { language, dataTimeScheduleModal, isShowLinkDetail, doctorID } =
      this.props;
    let nameVi = "",
      nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName}  ${dataProfile.lastName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName}  ${dataProfile.lastName}`;
    }

    return (
      <>
        <div className="doctor-desc-profile">
          <div
            className="image"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ""
              })`,
            }}
          ></div>

          <div className="name">
            <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
            <div>
              <i className="fas fa-briefcase-medical"></i>
              {dataProfile &&
                dataProfile.Markdown &&
                dataProfile.Markdown.description && (
                  <span>{dataProfile.Markdown.description}</span>
                )}
            </div>
          </div>
        </div>

        {isShowLinkDetail === true && (
          <div className="moreInfoDoctor">
            <Link to={`/detail-doctor/${doctorID}`}>
              <FormattedMessage id="specialty-home.more-info" />
            </Link>
          </div>
        )}

        <div className="more-info">
          <div className="price-schedule">
            <span>
              <FormattedMessage id="book-modal.priceBookModal" />
            </span>
            <span>
              {dataProfile &&
                dataProfile.Doctor_Info &&
                language === LANGUAGES.VI && (
                  <NumberFormat
                    value={dataProfile.Doctor_Info.priceTypeData.valueVi}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                  />
                )}
              {dataProfile &&
                dataProfile.Doctor_Info &&
                language === LANGUAGES.EN && (
                  <NumberFormat
                    value={dataProfile.Doctor_Info.priceTypeData.valueEn}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"$"}
                  />
                )}
            </span>
          </div>

          <div className="price-schedule ">
            {this.renderDateBooking(dataTimeScheduleModal)}
          </div>
          <div className="price-schedule">
            {this.renderTimeBooking(dataTimeScheduleModal)}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
