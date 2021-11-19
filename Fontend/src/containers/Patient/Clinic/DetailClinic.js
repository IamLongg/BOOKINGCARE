import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailClinic.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import Footer from "../../HomePage/Footer/Footer";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getDetailClinicByID,
  getALLCodeSerVice,
} from "../../../services/userService";
import _, { result } from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorID: [],
      dataDetailClinic: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getDetailClinicByID({
        id: id,
      });

      if (res && res.data.errCode === 0) {
        let data = res.data.data;
        let arrDoctorID = [];
        if (data && !_.isEmpty(res.data.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorID.push(item.doctorID);
            });
          }
        }

        this.setState({
          dataDetailClinic: res.data.data,
          arrDoctorID: arrDoctorID,
        });
      }
    }
  }

  async componentDidUpdate(preProps, prevState, snapshot) {
    if (this.props.language !== preProps.language) {
    }
  }

  render() {
    let { arrDoctorID, dataDetailClinic } = this.state;
    let { language } = this.props;
    console.log("check data detail state", this.state);
    return (
      <>
        <HomeHeader />
        <div className="detailClinic">
          <div className="description">
            {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
              <div
                className="container"
                dangerouslySetInnerHTML={{
                  __html: dataDetailClinic.descriptionHTML,
                }}
              ></div>
            )}
          </div>

          {arrDoctorID &&
            arrDoctorID.length > 0 &&
            arrDoctorID.map((item, index) => {
              return (
                <div className="detailClinic-schedule container" key={index}>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
