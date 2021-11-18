import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./TableManageUser.scss";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        userRedux: this.props.listUsers,
      });
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteOfUserRedux(user.id);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserFromParentKey(user);
  };
  render() {
    console.log("brodev check all users", this.props.listUsers);
    console.log("brodev check state all users", this.state.userRedux);
    let arrUsers = this.state.userRedux;
    return (
      <>
        <section>
          <table className="col-12" style={{ margin: "5rem 0" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Họ </th>
                <th>Tên</th>
                <th>Email</th>
                <th>Địa Chỉ</th>
                <th>Chức Năng</th>
              </tr>
            </thead>

            <tbody>
              {arrUsers &&
                arrUsers.length > 0 &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-info "
                          style={{ fontSize: "1.2rem" }}
                          onClick={() => this.handleEditUser(item)}
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger "
                          style={{ fontSize: "1.2rem" }}
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>

        {/* <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
