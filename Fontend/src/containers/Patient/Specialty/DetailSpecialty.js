import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import Footer from "../../HomePage/Footer/Footer";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "../Doctor/ProfileDoctor";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorID: [33, 32, 31],
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(preProps, prevState, snapshot) {
    if (this.props.language !== preProps.language) {
    }
  }

  render() {
    let { arrDoctorID } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="detailSpecialty container">
          <div className="description"></div>

          {arrDoctorID &&
            arrDoctorID.length > 0 &&
            arrDoctorID.map((item, index) => {
              return (
                <div className="detailSpecialty-schedule" key={index}>
                  <div className="infoOfDoctor">
                    <h2 className="heading">
                      <FormattedMessage id="page-detail-specialty.infoDoctor" />
                    </h2>
                    <ProfileDoctor doctorID={item} />
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
