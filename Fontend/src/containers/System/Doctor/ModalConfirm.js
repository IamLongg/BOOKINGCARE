import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalConfirm.scss";
import { LANGUAGES } from "../../../utils";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { CommonUtils } from "../../../utils";

class ModalConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgbase64: "",
    };
  }

  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgbase64: base64,
      });
    }
  };

  handleSendMailConfirm = () => {
    this.props.sendMailConfirm(this.state);
  };

  render() {
    let { isOpenModalConfirmMail, close, dataModal, sendMailConfirm } =
      this.props;

    return (
      <>
        <Modal isOpen={isOpenModalConfirmMail} size="lg" centered>
          <div className="modal-header">Xác Nhận</div>
          <ModalBody>
            <div className="container">
              <div className="col-12">
                <form className="row g-3">
                  <div className="col-12">
                    <label htmlFor="inputEmail4" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={this.state.email}
                      onChange={(event) => this.handleOnChangeEmail(event)}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputPassword4" className="form-label">
                      Chọn file
                    </label>
                    <input
                      type="file"
                      className="form-control-file"
                      onChange={(event) => this.handleOnchangeImage(event)}
                    />
                  </div>
                </form>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn-send"
              color="primary"
              onClick={() => this.handleSendMailConfirm()}
            >
              Xác nhận
            </button>{" "}
            <button className="btn-send" color="secondary" onClick={close}>
              Hủy bỏ
            </button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirm);
