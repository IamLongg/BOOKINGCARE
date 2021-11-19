import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import { getDetailInfoDoctor } from "../../../services/userService";
import Select from "react-select";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save info markdown
      contentMarkDown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],

      //save info doctor
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],

      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      specialtyID: "",
      clinicID: "",

      backupData: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getRequiredDoctorInfo();
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.firstName} ${item.lastName}`;
          let labelEn = `${item.lastName} ${item.firstName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn} $`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }

      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }

      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }

    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let { resPayment, resPrice, resProvince, resSpecialty, resClinic } =
        this.props.allRequiredDoctorInfo;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      let dataSelectSpecialty = this.buildDataInputSelect(
        resSpecialty,
        "SPECIALTY"
      );
      let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC");

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfo;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkDown: text,
      contentHTML: html,
    });
  };

  handleSaveContent = () => {
    let { backupData } = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkDown: this.state.contentMarkDown,
      description: this.state.description,
      doctorID: this.state.selectedOption.value,
      action: backupData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      clinicID: this.state.selectedClinic.value,
      specialtyID: this.state.selectedSpecialty.value,
      note: this.state.note,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPrice, listPayment, listProvince, listSpecialty, listClinic } =
      this.state;

    let res = await getDetailInfoDoctor(selectedOption.value);
    if (
      res &&
      res.data.errCode === 0 &&
      res.data.data &&
      res.data.data.Markdown
    ) {
      let markdown = res.data.data.Markdown;

      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentID = "",
        provinceID = "",
        priceID = "",
        selectedPayment = "",
        selectedProvince = "",
        selectedPrice = "",
        selectedSpecialty = "",
        specialtyID = "",
        clinicID = "",
        selectedClinic = "";

      if (res.data.data.Doctor_Info) {
        addressClinic = res.data.data.Doctor_Info.addressClinic;
        nameClinic = res.data.data.Doctor_Info.nameClinic;
        note = res.data.data.Doctor_Info.note;

        paymentID = res.data.data.Doctor_Info.paymentID;
        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentID;
        });
        provinceID = res.data.data.Doctor_Info.provinceID;
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceID;
        });
        priceID = res.data.data.Doctor_Info.priceID;
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceID;
        });

        specialtyID = res.data.data.Doctor_Info.specialtyID;
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyID;
        });

        clinicID = res.data.data.Doctor_Info.clinicID;
        selectedClinic = listClinic.find((item) => {
          return item && item.value === clinicID;
        });
      }

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkDown: markdown.contentMarkDown,
        description: markdown.description,
        backupData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince,
        selectedPrice: selectedPrice,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkDown: "",
        description: "",
        backupData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedPayment: "",
        selectedProvince: "",
        selectedPrice: "",
        selectedSpecialty: "",
        selectedClinic: "",
      });
    }
  };

  handleChangeSelectDoctorInfo = (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
    console.log("check new select onchange", selectedOption, stateName);
  };

  handleOnchangeDesc = (event, id) => {
    let stateCopy = {
      ...this.state,
    };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  render() {
    console.log("brodev :", this.state);
    let { backupData, listSpecialty } = this.state;
    return (
      <>
        <div className="container">
          <div className="admin-title">
            <FormattedMessage id="admin.manage-doctor.title" />
          </div>
          <div className="moreInfo">
            <div className="moreInfo-doctor">
              <label>
                {" "}
                <FormattedMessage id="admin.manage-doctor.chooseInfo" />
              </label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.chooseInfo" />
                }
              />
            </div>
            <div className="moreInfo-desc">
              <label>
                {" "}
                <FormattedMessage id="admin.manage-doctor.produceInfo" />
              </label>
              <textarea
                className="form-control"
                style={{ fontSize: "1.4rem" }}
                rows="4"
                onChange={(event) => {
                  this.handleOnchangeDesc(event, "description");
                }}
                value={this.state.description}
              ></textarea>
            </div>
          </div>
          <div className="moreInfo-extra">
            <div className="row">
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choosePrice" />
                </label>
                <Select
                  value={this.state.selectedPrice}
                  onChange={this.handleChangeSelectDoctorInfo}
                  options={this.state.listPrice}
                  placeholder={
                    <FormattedMessage id="manage-schedule.choosePrice" />
                  }
                  name="selectedPrice"
                />
              </div>
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choosePayment" />
                </label>
                <Select
                  value={this.state.selectedPayment}
                  onChange={this.handleChangeSelectDoctorInfo}
                  options={this.state.listPayment}
                  placeholder={
                    <FormattedMessage id="manage-schedule.choosePayment" />
                  }
                  name="selectedPayment"
                />
              </div>
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.chooseProvince" />
                </label>
                <Select
                  value={this.state.selectedProvince}
                  onChange={this.handleChangeSelectDoctorInfo}
                  options={this.state.listProvince}
                  placeholder={
                    <FormattedMessage id="manage-schedule.chooseProvince" />
                  }
                  name="selectedProvince"
                />
              </div>

              <div className="col-4 form-group">
                <label>
                  {" "}
                  <FormattedMessage id="manage-schedule.chooseNameSchedule" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnchangeDesc(event, "nameClinic");
                  }}
                  value={this.state.nameClinic}
                />
              </div>
              <div className="col-4 form-group">
                <label>
                  {" "}
                  <FormattedMessage id="manage-schedule.chooseAddressSchedule" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnchangeDesc(event, "addressClinic");
                  }}
                  value={this.state.addressClinic}
                />
              </div>
              <div className="col-4 form-group">
                <label>
                  {" "}
                  <FormattedMessage id="manage-schedule.note" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnchangeDesc(event, "note");
                  }}
                  value={this.state.note}
                />
              </div>
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.chooseSpecialty" />
                </label>
                <Select
                  value={this.state.selectedSpecialty}
                  onChange={this.handleChangeSelectDoctorInfo}
                  options={listSpecialty}
                  placeholder={
                    <FormattedMessage id="manage-schedule.chooseSpecialty" />
                  }
                  name="selectedSpecialty"
                />
              </div>
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.chooseClinic" />
                </label>
                <Select
                  value={this.state.selectedClinic}
                  onChange={this.handleChangeSelectDoctorInfo}
                  options={this.state.listClinic}
                  placeholder={
                    <FormattedMessage id="manage-schedule.chooseClinic" />
                  }
                  name="selectedClinic"
                />
              </div>
            </div>
          </div>
          <div className="markdown-editor">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkDown}
            />
          </div>
          <button
            className={backupData === true ? "saveMarkDown" : "createMarkDown"}
            onClick={() => {
              this.handleSaveContent();
            }}
          >
            {backupData === false ? (
              <span>
                <FormattedMessage id="admin.manage-doctor.createInfo" />
              </span>
            ) : (
              <span>
                <FormattedMessage id="admin.manage-doctor.saveInfo" />
              </span>
            )}
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
