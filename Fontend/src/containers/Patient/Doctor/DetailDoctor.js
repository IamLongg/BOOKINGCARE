import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInfoDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorID: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorID: id,
      });
      let res = await getDetailInfoDoctor(id);
      if (res && res.data.errCode === 0) {
        this.setState({
          detailDoctor: res.data.data,
        });
      }
    }
  }

  componentDidUpdate(preProps, prevState, snapshot) {}

  render() {
    console.log("brodev check state", this.state);
    let { language } = this.props;
    let { detailDoctor } = this.state;
    let nameVi = "",
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName}  ${detailDoctor.lastName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName}  ${detailDoctor.lastName}`;
    }
    return (
      <>
        <HomeHeader isShowSearch={false} />
        <div className="doctor-detail">
          <div className="container flex">
            <div className="doctor-desc">
              <div className="doctor-desc-profile">
                <div
                  className="image"
                  style={{
                    backgroundImage: `url(${
                      detailDoctor && detailDoctor.image
                        ? detailDoctor.image
                        : ""
                    })`,
                  }}
                ></div>

                <div className="name">
                  <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                  <div>
                    <i className="fas fa-briefcase-medical"></i>
                    {detailDoctor &&
                      detailDoctor.Markdown &&
                      detailDoctor.Markdown.description && (
                        <span>{detailDoctor.Markdown.description}</span>
                      )}
                  </div>
                  <div>
                    <i className="fas fa-heartbeat"></i>Bác sĩ ơi
                  </div>
                </div>
              </div>
              <hr></hr>
              <div className="doctor-info">
                {/* <p>chuyên khoa phụ sản</p>
                <p>tầng 6 tòa nhà Ford, Hà Nội</p>
                <p>Thành phố Hà Nội </p>
                <h2 className="doctor-title">Quá trình công tác</h2>
                <ul className="timeline">
                  <li>
                    <span className="history">
                      (11/09/2008 - 11/09/2013) Giảng viên, Bộ môn phụ sản
                      Trường Đại học y dược Thái Bình
                    </span>
                  </li>
                  <li>
                    <span className="history">
                      (11/09/2014 - 11/09/2021) Bác sĩ điều trị, Khoa sản bệnh
                      viện Việt Pháp Hà Nội{" "}
                    </span>
                  </li>
                </ul>
                <h2 className="doctor-title">Khám và điều trị</h2>
                <p>khám siêu âm quản lý thai ngán</p>
                <p>khám siêu âm quản lý thai ngán</p>
                <p>khám siêu âm quản lý thai ngán</p>
                <p>khám siêu âm quản lý thai ngán</p>
                <p>khám siêu âm quản lý thai ngán</p>
                <p>khám siêu âm quản lý thai ngán</p> */}

                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.contentHTML && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: detailDoctor.Markdown.contentHTML,
                      }}
                    ></div>
                  )}
              </div>
            </div>
            <DoctorSchedule doctorIdFromParent={this.state.currentDoctorID} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
