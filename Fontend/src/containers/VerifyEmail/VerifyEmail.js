import React, { Component } from "react";
import { connect } from "react-redux";
import { postVerifyBookAppointMent } from "../../services/userService";
import "./VerifyEmail.scss";
import HomeHeader from "../HomePage/Header/HomeHeader";
import Footer from "../HomePage/Footer/Footer";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorID = urlParams.get("doctorID");
      let res = await postVerifyBookAppointMent({
        token: token,
        doctorID: doctorID,
      });

      if (res && res.data.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.data.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.data.errCode ? res.data.errCode : -1,
        });
      }
    }
  }

  async componentDidUpdate(preProps, prevState, snapshot) {
    if (this.props.language !== preProps.language) {
    }
  }

  handleReturnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  render() {
    let statusVerify = this.state.statusVerify;
    let errCode = this.state.errCode;
    return (
      <>
        <HomeHeader />
        {statusVerify === false ? (
          <div>Loading data...</div>
        ) : (
          <div>
            {+errCode === 0 ? (
              <div className="notify">
                <h2>
                  <FormattedMessage id="verify-email.notifySuccess" />
                </h2>
                <p>
                  <FormattedMessage id="verify-email.notifySuccessMoreInfo" />
                </p>
                <p>
                  <FormattedMessage id="verify-email.notifyThankyou" />
                </p>
              </div>
            ) : (
              <div className="notify">
                <h2>
                  <FormattedMessage id="verify-email.notifyFailed" />
                </h2>
                <p>
                  <FormattedMessage id="verify-email.notifyLink" />
                </p>
                <p>
                  <a href="#" onClick={() => this.handleReturnToHome()}>
                    <FormattedMessage id="verify-email.notifyLinkHere" />
                  </a>
                </p>
              </div>
            )}
          </div>
        )}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VerifyEmail)
);
