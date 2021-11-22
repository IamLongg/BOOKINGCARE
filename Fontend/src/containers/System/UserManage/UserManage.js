import { get } from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../UserManage/UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUser,
  editUserApi,
} from "../../../services/userService";
import ModalUser from "../ModalUser";
import { emitter } from "../../../utils/emitter";
import ModalEditUser from "../ModalEditUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenEditModalUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUserFromReact();
  }

  getAllUserFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.data.errCode === 0) {
      this.setState({
        arrUsers: response.data.users,
      });
    }
    console.log("get user data from node js:", response);
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleModalUser = () => {
    this.setState({
      isOpenModalUser: false,
    });
  };

  toggleModaEditlUser = () => {
    this.setState({
      isOpenEditModalUser: false,
    });
  };

  createNewUser = async (data) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.data.errCode !== 0) {
        alert(res.data.errMessage);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUser(user.id);
      if (res && res.data.errCode === 0) {
        await this.getAllUserFromReact();
      } else {
        alert(res.data.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditUser = (user) => {
    console.log("check edit user", user);
    this.setState({
      isOpenEditModalUser: true,
      userEdit: user,
    });
  };

  handleSaveUser = async (user) => {
    try {
      let res = await editUserApi(user);
      if (res && res.data.errCode === 0) {
        this.setState({
          isOpenEditModalUser: false,
        });
        await this.getAllUserFromReact();
      } else {
        alert(res.data.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <section>
        <div>
          <ModalUser
            isOpen={this.state.isOpenModalUser}
            toggleFromParent={this.toggleModalUser}
            createNewUser={this.createNewUser}
          />
          {this.state.isOpenEditModalUser && (
            <ModalEditUser
              isOpen={this.state.isOpenEditModalUser}
              toggleFromParent={this.toggleModaEditlUser}
              currentUser={this.state.userEdit}
              editUser={this.handleSaveUser}
            />
          )}
          <div className="row justify-content-center">
            <div className="col-md-6 text-center ">
              <h2 className="heading-section admin-title">
                Danh sách người dùng
              </h2>
            </div>
          </div>
          {/* <div
            className="btn-primary"
            onClick={() => {
              this.handleAddNewUser();
            }}
          >
            <i className="fas fa-plus-circle" style={{ margin: "0 5px" }}></i>
            Thêm dùng người mới
          </div> */}
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Họ</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Địa Chỉ</th>
              {/* <th>Chức Năng</th> */}
            </tr>
          </thead>

          <tbody>
            {arrUsers &&
              arrUsers.map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                      {/* <td>
                        <button
                          type="button"
                          className="btn btn-info "
                          style={{ fontSize: "1.2rem" }}
                          onClick={() => {
                            this.handleEditUser(item);
                          }}
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger "
                          style={{ fontSize: "1.2rem" }}
                          onClick={() => {
                            this.handleDeleteUser(item);
                          }}
                        >
                          Xóa
                        </button>
                      </td> */}
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
