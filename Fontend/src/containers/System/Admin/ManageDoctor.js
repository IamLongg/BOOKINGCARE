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
      contentMarkDown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      backupData: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.firstName} ${item.lastName}`;
        let labelEn = `${item.lastName} ${item.firstName}`;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }

    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
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
          <div className="admin-title">Tao them thong tin bac si</div>
          <div className="moreInfo">
            <div className="moreInfo-doctor">
              <label>Chọn bác sĩ:</label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
              />
            </div>
            <div className="moreInfo-desc">
              <label>Thông tin giới thiệu :</label>
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
              <span>Tạo thông tin</span>
            ) : (
              <span>Lưu thông tin</span>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
