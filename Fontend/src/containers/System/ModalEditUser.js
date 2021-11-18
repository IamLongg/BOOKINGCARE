import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
    console.log("didmount edit modal:", this.props.currentUser);
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("check good state:", this.state);
      }
    );
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("missing parameters:" + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      // call api edit user
      this.props.editUser(this.state);
    }
  };

  render() {
    let { email, firstName, lastName, address } = this.state;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"vaa"}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Sửa Người Dùng
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="col-12">
              <form className="row g-3">
                <div className="col-12">
                  <label htmlFor="inputEmail4" className="form-label">
                    Email
                  </label>
                  <input
                    style={{ fontSize: "1.6rem", marginBottom: "2rem" }}
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "email");
                    }}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    Họ
                  </label>
                  <input
                    style={{ fontSize: "1.6rem" }}
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    name="firstName"
                    value={firstName}
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "firstName");
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    Tên
                  </label>
                  <input
                    style={{ fontSize: "1.6rem" }}
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    name="lastName"
                    value={lastName}
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "lastName");
                    }}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">
                    Địa Chỉ
                  </label>
                  <input
                    style={{ fontSize: "1.6rem" }}
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="1234 Main St"
                    value={address}
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "address");
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            Thêm
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            Hủy Bỏ
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
