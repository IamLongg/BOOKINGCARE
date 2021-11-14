import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import {
  getScheduleDoctorByDate,
  getInfoDoctorScheduleById,
} from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import BookModal from "./BookModal";

// import Select from "react-select";

import { LANGUAGES } from "../../../utils";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvalableTime: [],
      infoSchedule: {},
      isOpenBookModal: false,
      dataTimeScheduleModal: {},
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    console.log("moment vi:", moment(new Date()).format("dddd - DD/MM"));
    console.log(
      "moment en: ",
      moment(new Date()).locale("en").format("ddd - DD/MM")
    );
    let allDays = this.setArrDays(language);

    this.setState({
      allDays: allDays,
    });

    if (this.props.doctorIdFromParent) {
      let resGetData = await getInfoDoctorScheduleById(
        this.props.doctorIdFromParent
      );
      if (resGetData && resGetData.data.errCode === 0) {
        this.setState({
          infoSchedule: resGetData.data.data,
        });
      }
    }

    if (this.props.doctorIdFromParent) {
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvalableTime: res.data.data ? res.data.data : [],
      });
    }
  }

  setArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = labelVi;
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      allDays.push(object);
    }

    return allDays;
  };

  async componentDidUpdate(preProps, prevState, snapshot) {
    if (this.props.language !== preProps.language) {
      let allDays = this.setArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.doctorIdFromParent !== preProps.doctorIdFromParent) {
      let allDays = this.setArrDays(this.props.language);
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvalableTime: res.data.data ? res.data.data : [],
      });

      let resGetData = await getInfoDoctorScheduleById(
        this.props.doctorIdFromParent
      );
      if (resGetData && resGetData.data.errCode === 0) {
        this.setState({
          infoSchedule: resGetData.data.data,
        });
      }
      // console.log("=== brodev check get data:", resGetData);
    }
  }

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorID = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorID, date);
      if (res && res.data.errCode === 0) {
        this.setState({
          allAvalableTime: res.data.data ? res.data.data : [],
        });
      }
      console.log("check schedule from doctor", res);
    }
  };

  handleInfoBookModal = (time) => {
    this.setState({
      isOpenBookModal: true,
      dataTimeScheduleModal: time,
    });
  };

  handleCloseBookModal = () => {
    this.setState({
      isOpenBookModal: false,
    });
  };

  render() {
    // let options = this.state.allDays;
    let {
      allDays,
      allAvalableTime,
      infoSchedule,
      isOpenBookModal,
      dataTimeScheduleModal,
    } = this.state;
    let { language } = this.props;
    // console.log("===check state :", this.state);
    return (
      <>
        <div className="doctor-calender">
          <div className="doctor-calender-title">
            <FormattedMessage id="page-detail-doctor.schedule" />
          </div>
          <div className="doctor-calender-date">
            <h5>
              <i className="fas fa-calendar-alt"></i>
              <FormattedMessage id="page-detail-doctor.scheduleDate" />
            </h5>
            {/* <Select
              onChange={(event) => this.handleOnChangeSelect(event)}
              className="dropDownSelect"
              options={options}
            /> */}
            <select
              className="dropDownSelect"
              onChange={(event) => this.handleOnChangeSelect(event)}
            >
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="doctor-calender-time">
            <h5>
              <i className="fas fa-calendar-check"></i>
              <FormattedMessage id="page-detail-doctor.scheduleTime" />
            </h5>
            {allAvalableTime &&
              allAvalableTime.length > 0 &&
              allAvalableTime.map((item, index) => {
                let displayTime =
                  language === LANGUAGES.VI
                    ? item.timeTypeData.valueVi
                    : item.timeTypeData.valueEn;

                return (
                  <button
                    className="btn-celendartime"
                    key={index}
                    onClick={() => this.handleInfoBookModal(item)}
                  >
                    {displayTime}
                  </button>
                );
              })}
          </div>
          <hr></hr>
          <div className="doctor-infoSchedule">
            <div className="doctor-infoSchedule-addressClinic">
              <h5>
                <i className="fas fa-map-marker-alt"></i>
                <FormattedMessage id="page-detail-doctor.scheduleAddress" />
              </h5>
            </div>
            <p>
              {infoSchedule && infoSchedule.addressClinic
                ? infoSchedule.addressClinic
                : ""}
            </p>
            <div className="doctor-infoSchedule-nameClinic">
              <h5>
                <i className="fas fa-map-marker-alt"></i>
                <FormattedMessage id="page-detail-doctor.nameClinic" />
              </h5>
            </div>
            <p>
              {infoSchedule && infoSchedule.nameClinic
                ? infoSchedule.nameClinic
                : ""}
            </p>
            <div className="doctor-infoSchedule-addressClinic">
              <h5>
                <FormattedMessage id="page-detail-doctor.payment" />
              </h5>
              <p>
                <FormattedMessage id="page-detail-doctor.subPayment" />{" "}
                {infoSchedule &&
                infoSchedule.paymentTypeData &&
                language === LANGUAGES.VI
                  ? infoSchedule.paymentTypeData.valueVi
                  : ""}
                {infoSchedule &&
                infoSchedule.paymentTypeData &&
                language === LANGUAGES.EN
                  ? infoSchedule.paymentTypeData.valueEn
                  : ""}
              </p>
            </div>
            <div className="doctor-infoSchedule-note">
              <h5>
                <FormattedMessage id="page-detail-doctor.scheduleNote" />
              </h5>
              <span className="sub-note">
                {infoSchedule && infoSchedule.note ? infoSchedule.note : ""}
              </span>
            </div>
            <div className="doctor-infoSchedule-priceSchedule">
              <span>
                <FormattedMessage id="page-detail-doctor.schedulePrice" />
              </span>
              <span>
                {infoSchedule &&
                  infoSchedule.priceTypeData &&
                  language === LANGUAGES.VI && (
                    <NumberFormat
                      value={infoSchedule.priceTypeData.valueVi}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" VND"}
                    />
                  )}

                {infoSchedule &&
                  infoSchedule.priceTypeData &&
                  language === LANGUAGES.EN && (
                    <NumberFormat
                      value={infoSchedule.priceTypeData.valueEn}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"$"}
                    />
                  )}
              </span>
            </div>
          </div>
        </div>
        <BookModal
          isOpenBookModal={isOpenBookModal}
          handleCloseBookModal={this.handleCloseBookModal}
          dataTimeScheduleModal={dataTimeScheduleModal}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
