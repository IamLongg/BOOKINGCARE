import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

// import Select from "react-select";

import { LANGUAGES } from "../../../utils";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvalableTime: [],
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

  render() {
    // let options = this.state.allDays;
    let { allDays, allAvalableTime } = this.state;
    let { language } = this.props;
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
                  <button className="btn-celendartime" key={index}>
                    {displayTime}
                  </button>
                );
              })}
          </div>
          <hr></hr>
          <div className="doctor-infoSchedule">
            <div className="doctor-infoSchedule-addressClinic">
              <h5>
                <i class="fas fa-map-marker-alt"></i>địa chỉ khám
              </h5>
            </div>
            <p>40 Tràng Thi, Hàng Bông, Hoàn Kiếm, Thành phố Hà Nội</p>
            <div className="doctor-infoSchedule-nameClinic">
              <h5>
                <i class="fas fa-map-marker-alt"></i>tên phòng khám
              </h5>
            </div>
            <p>Bệnh viện Hữu Nghị Việt Đức</p>
            <div className="doctor-infoSchedule-priceSchedule">
              <span>giá khám</span>
              <span>500,000 VND</span>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
