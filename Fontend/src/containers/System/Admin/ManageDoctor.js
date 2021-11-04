import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import Select from "react-select";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkDown: "",
      contentHTML: "",
      selectedOption: "",
      desctiption: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkDown: text,
      contentHTML: html,
    });
  };

  handleSaveContent = () => {
    console.log("check state", this.state);
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  handleOnchangeDesc = (event) => {
    this.setState({
      desctiption: event.target.value,
    });
  };
  render() {
    return (
      <>
        <div className="container">
          <div className="title">Tao them thong tin bac si</div>
          <div className="moreInfo">
            <div className="moreInfo-doctor">
              <label>Chọn bác sĩ:</label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={options}
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
                value={this.state.desctiption}
              >
                abcfaafa
              </textarea>
            </div>
          </div>
          <div className="markdown-editor">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
            />
          </div>
          <button
            className="saveMarkDown"
            onClick={() => {
              this.handleSaveContent();
            }}
          >
            Lưu thông tin
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteOfUserRedux: (id) => dispatch(actions.deleteOfUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
