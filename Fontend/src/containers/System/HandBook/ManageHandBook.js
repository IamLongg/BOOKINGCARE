import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageHandBook.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils } from "../../../utils";
import { postCreateNewHandBook } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      info: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkDown: "",
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(preProps, prevState, snapshot) {
    if (this.props.language !== preProps.language) {
    }
  }

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkDown: text,
    });
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSaveHandBook = async () => {
    let res = await postCreateNewHandBook(this.state);
    if (res && res.data.errCode === 0) {
      toast.success("Tạo bài viết thành công !");
      this.setState({
        name: "",
        info: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkDown: "",
      });
    } else {
      toast.error("Tạo bài viết thất bại !");
      console.log("check res", res);
    }
  };

  render() {
    return (
      <>
        <div className="specialty-container">
          <div className="admin-title">Quản lý cẩm nang</div>
          <div className="markdown row">
            <div className="col-6 form-group">
              <label>Tiêu đề bài viết</label>
              <input
                className="form-control"
                value={this.state.name}
                onChange={(event) => this.handleOnChangeInput(event, "name")}
              ></input>
            </div>
            <div className="col-6 form-group">
              <label>Ảnh đại diện</label>
              <input
                className="form-control-file"
                type="file"
                onChange={(event) => this.handleOnchangeImage(event)}
              ></input>
            </div>
            <div className="col-6 form-group">
              <label>Thông tin</label>
              <input
                className="form-control"
                value={this.state.info}
                onChange={(event) => this.handleOnChangeInput(event, "info")}
              ></input>
            </div>
            <div className="col-12">
              <MdEditor
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkDown}
              />
            </div>
            <div className="col-12">
              <button
                className="btnSaveSpecialty"
                onClick={() => this.handleSaveHandBook()}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandBook);
