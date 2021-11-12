import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookModal.scss";
import { LANGUAGES } from "../../../utils";
import { Modal } from "reactstrap";
import ProfileDoctor from "./ProfileDoctor";
import DatePicker from "../../../components/Input/DatePicker";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { postBookAppointMent } from "../../../services/userService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

class BookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      numberPhone: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      genders: "",
      doctorID: "",
      timeType: "",
    };
  }

  async componentDidMount() {
    this.props.fetchGender();
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(preProps, prevState, snapshot) {
    if (this.props.language !== preProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }

    if (this.props.genders !== preProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }

    if (this.props.dataTimeScheduleModal !== preProps.dataTimeScheduleModal) {
      if (
        this.props.dataTimeScheduleModal &&
        !_.isEmpty(this.props.dataTimeScheduleModal)
      ) {
        let doctorID = this.props.dataTimeScheduleModal.doctorID;
        let timeType = this.props.dataTimeScheduleModal.timeType;
        this.setState({
          doctorID: doctorID,
          timeType: timeType,
        });
      }
    }
  }

  handleOnChange = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };

  handleConfirmBookModal = async () => {
    let date = new Date(this.state.birthday).getTime();
    let res = await postBookAppointMent({
      fullName: this.state.fullName,
      numberPhone: this.state.numberPhone,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      selectedGender: this.state.selectedGender.value,
      doctorID: this.state.doctorID,
      timeType: this.state.timeType,
    });

    if (res && res.data.errCode === 0) {
      toast.success("Đặt lịch khám thành công!");
      this.props.handleCloseBookModal();
    } else {
      toast.error("Đặt lịch khám thất bại");
    }
  };

  render() {
    let { isOpenBookModal, handleCloseBookModal, dataTimeScheduleModal } =
      this.props;
    let doctorID = "";
    if (dataTimeScheduleModal && !_.isEmpty(dataTimeScheduleModal)) {
      doctorID = dataTimeScheduleModal.doctorID;
    }
    // console.log("data state in from modal:", this.state);
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
              <span>
                <FormattedMessage id="book-modal.infoBookModal" />
              </span>
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
                  <label>
                    <FormattedMessage id="book-modal.fullName" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.fullName}
                    onChange={(event) => this.handleOnChange(event, "fullName")}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="book-modal.numberPhone" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.numberPhone}
                    onChange={(event) =>
                      this.handleOnChange(event, "numberPhone")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="book-modal.email" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.email}
                    onChange={(event) => this.handleOnChange(event, "email")}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="book-modal.address" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.address}
                    onChange={(event) => this.handleOnChange(event, "address")}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="book-modal.birthday" />
                  </label>
                  <DatePicker
                    className="form-control"
                    onChange={this.handleOnChangeDatePicker}
                    value={this.state.birthday}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="book-modal.gender" />
                  </label>
                  <Select
                    value={this.state.selectedGender}
                    onChange={this.handleChangeSelect}
                    options={this.state.genders}
                  />
                </div>
                <div className="col-12 form-group">
                  <label>
                    <FormattedMessage id="book-modal.reason" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.reason}
                    onChange={(event) => this.handleOnChange(event, "reason")}
                  />
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="bookModal-content-footer">
              <button
                className="btn-bookModal"
                onClick={() => this.handleConfirmBookModal()}
              >
                Xác Nhận
              </button>
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
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGender: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookModal);
