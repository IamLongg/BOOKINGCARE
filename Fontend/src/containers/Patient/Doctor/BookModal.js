import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookModal.scss";
import { LANGUAGES } from "../../../utils";
import { Modal } from "reactstrap";
import ProfileDoctor from "./ProfileDoctor";
import _ from "lodash";

class BookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  async componentDidUpdate(preProps, prevState, snapshot) {
    if (this.props.language !== preProps.language) {
    }
  }

  render() {
    let { isOpenBookModal, handleCloseBookModal, dataTimeScheduleModal } =
      this.props;
    let doctorID = "";
    if (dataTimeScheduleModal && !_.isEmpty(dataTimeScheduleModal)) {
      doctorID = dataTimeScheduleModal.doctorID;
    }
    console.log("data props in from modal:", this.props);
    return (
      <>
        <Modal
          isOpen={isOpenBookModal}
          className={"bookModal-container"}
          size="lg"
          centered
        >
          <div className="bookModal-content">
            <div className="bookModal-content-header">
              <span>thông tin đặt lịch khám bệnh</span>
              <span onClick={handleCloseBookModal}>
                <i className="fas fa-times-circle"></i>
              </span>
            </div>
            <hr></hr>
            <div className="bookModal-content-body">
              <ProfileDoctor
                doctorID={doctorID}
                dataTimeScheduleModal={dataTimeScheduleModal}
              />
              <div className="row">
                <div className="col-6 form-group">
                  <label>Họ tên</label>
                  <input className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>số điện thoại</label>
                  <input className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>Địa chỉ mail</label>
                  <input className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>địa chỉ liên hệ</label>
                  <input className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>đặt cho ai</label>
                  <input className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>giới tính</label>
                  <input className="form-control" />
                </div>
                <div className="col-12 form-group">
                  <label>lý do khám</label>
                  <input className="form-control" />
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="bookModal-content-footer">
              <button className="btn-bookModal">Xác Nhận</button>
              <button className="btn-bookModal" onClick={handleCloseBookModal}>
                Hủy bỏ
              </button>
            </div>
          </div>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookModal);
