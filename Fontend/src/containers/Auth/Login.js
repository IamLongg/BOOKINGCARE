import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { handleLoginApi } from "../../services/userService";

import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      isShowPass: false,
    };
  }

  handleChangeUser = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleChangePass = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleShowPass = () => {
    this.setState({
      isShowPass: !this.state.isShowPass,
    });
  };

  handleResetPass = () => {
    this.setState({
      password: "",
    });
  };

  handleLogin = async () => {
    this.setState({
      errorMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.email, this.state.password);
      if (data && data.data.errCode !== 0) {
        this.setState({
          errorMessage: data.data.message,
        });
      }
      if (data && data.data.errCode === 0) {
        this.props.userLoginSuccess(data.data.user);
        console.log("success");
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errorMessage: e.response.data.message,
          });
        }
      }
      console.log("email", e.response);
    }
  };

  render() {
    return (
      <div className="col-md-6 col-lg-4 offset-lg-4 offset-md-3 mt-5 ">
        <div className="bg-light p-5 border shadow">
          <form>
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="username"
                value={this.state.email}
                onChange={(event) => {
                  this.handleChangeUser(event);
                }}
              />
              <p className="form-text text-end"></p>
            </div>
            <div className="mb-4" style={{ position: "relative" }}>
              <input
                type={this.state.isShowPass ? "text" : "password"}
                className="form-control"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={(event) => {
                  this.handleChangePass(event);
                }}
              />
              <span
                style={{
                  position: "absolute",
                  right: "0.5rem",
                  top: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <i
                  className={
                    this.state.isShowPass ? "fas fa-eye" : "fas fa-eye-slash"
                  }
                  onClick={() => {
                    this.handleShowPass();
                  }}
                ></i>
              </span>
              <p className="form-text text-end"></p>
            </div>
            <div className="mb-4 form-check w-100">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" /> Remember
                Me
              </label>
              <a
                href="#"
                className="float-end"
                onClick={() => {
                  this.handleResetPass();
                }}
              >
                Reset Password
              </a>
            </div>
            <div className="mb-4" style={{ color: "red" }}>
              {this.state.errorMessage}
            </div>
            <button
              type="button"
              className="btn btn-primary w-100 my-3 shadow"
              onClick={() => {
                this.handleLogin();
              }}
            >
              Login
            </button>
            <p className="text-center m-0">
              Not yet account, <a href="#">Please Signup</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
