import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getListPatientForDoctor,
  postSendConfirm,
} from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import ModalConfirm from "./ModalConfirm";
import { toast } from "react-toastify";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenModalConfirm: false,
      dataModal: [],
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    let res = await getListPatientForDoctor({
      id: user.id,
      date: formatedDate,
    });
    if (res && res.data.errCode === 0) {
      this.setState({
        dataPatient: res.data.data,
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleConfirmAndSend = (item) => {
    let data = {
      doctorID: item.doctorID,
      id: item.id,
      patientID: item.patientID,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.lastName,
    };

    this.setState({
      isOpenModalConfirm: true,
      dataModal: data,
    });
    console.log("brodev check data", data);
  };

  close = () => {
    this.setState({
      isOpenModalConfirm: false,
      dataModal: {},
    });
  };

  sendMailConfirm = async (datafromModal) => {
    let { dataModal } = this.state;
    let res = await postSendConfirm({
      email: datafromModal.email,
      imgbase64: datafromModal.imgbase64,
      doctorID: dataModal.doctorID,
      patientID: dataModal.patientID,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
      id: dataModal.id,
    });
    console.log("brodev check res", res);
    if (res && res.data.errCode === 0) {
      toast.success("Xác nhận và gửi mail thành công !");
      this.close();
      await this.getDataPatient();
    } else {
      toast.error("Xác nhận thất bại !");
    }
  };

  render() {
    let { language } = this.props;
    let { dataPatient, isOpenModalConfirm, dataModal } = this.state;
    return (
      <React.Fragment>
        <div className="managePatient">
          <div className="admin-title">
            <FormattedMessage id="menu.doctor.manage-patient" />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-patient.datetimeSchedule" />
            </label>
            <DatePicker
              className="form-control"
              onChange={this.handleOnChangeDatePicker}
              value={this.state.currentDate}
            />
          </div>
          <div className="table-patient">
            <div className="limiter">
              <div className="container-table100">
                <div className="wrap-table100">
                  <div className="table100">
                    <table>
                      <thead>
                        <tr className="table100-head">
                          <th className="column1">
                            <FormattedMessage id="manage-patient.id" />
                          </th>
                          <th className="column2">
                            <FormattedMessage id="manage-patient.time" />
                          </th>
                          <th className="column3">
                            <FormattedMessage id="manage-patient.email" />
                          </th>
                          <th className="column4">
                            <FormattedMessage id="manage-patient.fullName" />
                          </th>
                          <th className="column5">
                            <FormattedMessage id="manage-patient.address" />
                          </th>
                          <th className="column6">
                            <FormattedMessage id="manage-patient.phone" />
                          </th>
                          <th className="column7">
                            <FormattedMessage id="manage-patient.gender" />
                          </th>
                          <th className="column8">
                            <FormattedMessage id="manage-patient.actions" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataPatient && dataPatient.length > 0 ? (
                          dataPatient.map((item, index) => {
                            let time =
                              language === LANGUAGES.VI
                                ? item.timeTypeDataPaTient.valueVi
                                : item.timeTypeDataPaTient.valueEn;
                            let gender =
                              language === LANGUAGES.VI
                                ? item.patientData.genderData.valueVi
                                : item.patientData.genderData.valueEn;
                            return (
                              <tr key={index}>
                                <td className="column1">{index + 1}</td>
                                <td className="column2">{time}</td>
                                <td className="column3">
                                  {item.patientData.email}
                                </td>
                                <td className="column4">
                                  {item.patientData.lastName}
                                </td>
                                <td className="column5">
                                  {item.patientData.address}
                                </td>
                                <td className="column6">
                                  {item.patientData.numberPhone}
                                </td>
                                <td className="column7">{gender}</td>
                                <td className="column8">
                                  <button
                                    className="btn-confirm"
                                    onClick={() =>
                                      this.handleConfirmAndSend(item)
                                    }
                                  >
                                    <FormattedMessage id="manage-patient.confirm" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="8">No data</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ModalConfirm
          isOpenModalConfirmMail={isOpenModalConfirm}
          dataModal={dataModal}
          close={this.close}
          sendMailConfirm={this.sendMailConfirm}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
