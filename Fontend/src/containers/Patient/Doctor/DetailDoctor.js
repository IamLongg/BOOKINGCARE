import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import Footer from "../../HomePage/Footer/Footer";
import "./DetailDoctor.scss";
import { getDetailInfoDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import CommentFB from "../Socials/CommentFB";
import LikeShareFB from "../Socials/LikeShareFB";

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

    let currentURL =
      +process.env.REACT_APP_IS_LOCALHOST === 1
        ? "https://chatbot-benh-vien1.herokuapp.com/"
        : window.location.href;

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
                  <div className="like-share">
                    <i
                      className="fas fa-heartbeat"
                      style={{ marginBottom: "1.5rem" }}
                    ></i>
                    Bác sĩ ơi
                    <LikeShareFB dataHref={currentURL} />
                  </div>
                </div>
              </div>
              <hr></hr>
              <div className="doctor-info">
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
        <div className="comment container">
          <CommentFB dataHref={currentURL} width={"100%"} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
