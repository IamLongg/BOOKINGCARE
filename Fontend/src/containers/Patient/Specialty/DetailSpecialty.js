import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import Footer from "../../HomePage/Footer/Footer";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getDetailSpecialtyByID,
  getALLCodeSerVice,
} from "../../../services/userService";
import _, { result } from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorID: [],
      dataDetailSpecialty: {},
      listProvince: [],
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getDetailSpecialtyByID({
        id: id,
        location: "ALL",
      });

      let resProvince = await getALLCodeSerVice("PROVINCE");

      if (
        res &&
        res.data.errCode === 0 &&
        resProvince &&
        resProvince.data.errCode === 0
      ) {
        let data = res.data.data;
        let arrDoctorID = [];
        if (data && !_.isEmpty(res.data.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorID.push(item.doctorID);
            });
          }
        }

        let dataProvince = resProvince.data.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            valueVi: "Toàn quốc",
            valueEn: "ALL",
          });
        }

        this.setState({
          dataDetailSpecialty: res.data.data,
          arrDoctorID: arrDoctorID,
          listProvince: dataProvince ? dataProvince : [],
        });
      }
    }
  }

  async componentDidUpdate(preProps, prevState, snapshot) {
    if (this.props.language !== preProps.language) {
    }
  }

  handleOnchangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;

      let res = await getDetailSpecialtyByID({
        id: id,
        location: location,
      });

      if (res && res.data.errCode === 0) {
        let data = res.data.data;
        let arrDoctorID = [];
        if (data && !_.isEmpty(res.data.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorID.push(item.doctorID);
            });
          }
        }

        this.setState({
          dataDetailSpecialty: res.data.data,
          arrDoctorID: arrDoctorID,
        });
      }
    }
  };

  render() {
    let { arrDoctorID, dataDetailSpecialty, listProvince } = this.state;
    let { language } = this.props;
    console.log("check data detail state", this.state);
    return (
      <>
        <HomeHeader />
        <div className="detailSpecialty container">
          <div className="description">
            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailSpecialty.descriptionHTML,
                }}
              ></div>
            )}
          </div>

          <div className="search">
            <select onChange={(event) => this.handleOnchangeSelect(event)}>
              {listProvince &&
                listProvince.length > 0 &&
                listProvince.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </option>
                  );
                })}
            </select>
          </div>

          {arrDoctorID &&
            arrDoctorID.length > 0 &&
            arrDoctorID.map((item, index) => {
              return (
                <div className="detailSpecialty-schedule" key={index}>
                  <div className="infoOfDoctor">
                    <h2 className="heading">
                      <FormattedMessage id="page-detail-specialty.infoDoctor" />
                    </h2>
                    <ProfileDoctor doctorID={item} isShowLinkDetail={true} />
                  </div>
                  <div className="scheduleOfDoctor">
                    <DoctorSchedule doctorIdFromParent={item} key={index} />
                  </div>
                </div>
              );
            })}
        </div>
        <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
