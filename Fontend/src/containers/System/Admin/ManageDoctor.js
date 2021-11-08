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
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",

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
      inputData.map((item, index) => {
        let object = {};
        let labelVi =
          type === "USERS"
            ? `${item.firstName} ${item.lastName}`
            : item.valueVi;
        let labelEn =
          type === "USERS"
            ? `${item.lastName} ${item.firstName}`
            : item.valueEn;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
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

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfo;

      let dataSelectPrice = this.buildDataInputSelect(resPrice);
      let dataSelectPayment = this.buildDataInputSelect(resPayment);
      let dataSelectProvince = this.buildDataInputSelect(resProvince);

      console.log(
        "check data new :",
        dataSelectPrice,
        dataSelectPayment,
        dataSelectProvince
      );

      this.setState({
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
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let res = await getDetailInfoDoctor(selectedOption.value);
    if (
      res &&
      res.data.errCode === 0 &&
      res.data.data &&
      res.data.data.Markdown
    ) {
      let markdown = res.data.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkDown: markdown.contentMarkDown,
        description: markdown.description,
        backupData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkDown: "",
        description: "",
        backupData: false,
      });
    }
    console.log("check res", res);
  };

  handleOnchangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  render() {
    console.log("brodev :", this.state);
    let { backupData } = this.state;
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
                placeholder="Chọn bác sĩ"
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
                  this.handleOnchangeDesc(event);
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
                  // value={this.state.selectedOption}
                  onChange={this.handleChangeSelect}
                  options={this.state.listPrice}
                  placeholder="Chọn giá"
                />
              </div>
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choosePayment" />
                </label>
                <Select
                  // value={this.state.selectedOption}
                  onChange={this.handleChangeSelect}
                  options={this.state.listPayment}
                  placeholder="Chọn thanh toán"
                />
              </div>
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.chooseProvince" />
                </label>
                <Select
                  // value={this.state.selectedOption}
                  onChange={this.handleChangeSelect}
                  options={this.state.listProvince}
                  placeholder="Chọn tỉnh thành"
                />
              </div>

              <div className="col-4 form-group">
                <label>
                  {" "}
                  <FormattedMessage id="manage-schedule.chooseNameSchedule" />
                </label>
                <input className="form-control" />
              </div>
              <div className="col-4 form-group">
                <label>
                  {" "}
                  <FormattedMessage id="manage-schedule.chooseAddressSchedule" />
                </label>
                <input className="form-control" />
              </div>
              <div className="col-4 form-group">
                <label>
                  {" "}
                  <FormattedMessage id="manage-schedule.note" />
                </label>
                <input className="form-control" />
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
