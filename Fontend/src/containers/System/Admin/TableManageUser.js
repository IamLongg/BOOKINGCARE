// import { get } from "lodash";
// import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
// import { connect } from "react-redux";
// import "./TableManageUser.scss";
// import * as actions from "../../../store/actions"

// // import {
// //   getAllUsers,
// //   createNewUserService,
// //   deleteUser,
// //   editUserApi,
// // } from "../../../services/userService";
// // import ModalUser from "../ModalUser";
// // import { emitter } from "../../../utils/emitter";
// // import ModalEditUser from "../ModalEditUser";

// class TableManageUser extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             userRedux: []
//         };
//     }
//     componentDidMount() {
//         this.props.fetchUserRedux();
//     }

//     componentDidUpdate(prevProps, prevState, snapshot) {
//         if (prevProps.listusers !== this.props.listusers) {
//             this.setState({
//                 userRedux: this.props.listusers
//             })
//         }
//     }
//     handleDeleteUser = (user) => {
//         this.props.deleteAUserRedux(user.id);
//     }

//     handleEditUser = (user) => {
//         this.props.handleEditUserFromParentkey(user)
//     }
//     render() {

//         let arrUsers = this.state.userRedux;

//         return (
//             <table id="TableManageUser">
//                 <tbody>
//                     <tr>
//                         <th>First Name</th>
//                         <th>Last Name</th>
//                         <th>Email</th>
//                         <th>Address</th>
//                         <th>Actions</th>
//                     </tr>

//                     {arrUsers && arrUsers.length > 0 &&
//                         arrUsers.map((item, index) => {
//                             return (
//                                 <tr key={index}>
//                                     <td>{item.id}</td>
//                                     <td>{item.firstName}</td>
//                                     <td>{item.lastName}</td>
//                                     <td>{item.email}</td>
//                                     <td>{item.address}</td>
//                                     <td>
//                                         <button
//                                             type="button"
//                                             className="btn-edit "
//                                             style={{ fontSize: "1.2rem" }}
//                                             onClick={() => {
//                                                 this.handleEditUser(item);
//                                             }}
//                                         >
//                                             <i className="fas fa-pencil-alt"></i>
//                                         </button>
//                                         <button
//                                             type="button"
//                                             className="btn-delete "
//                                             style={{ fontSize: "1.2rem" }}
//                                             onClick={() => {
//                                                 this.handleDeleteUser(item);
//                                             }}
//                                         >
//                                             <i className="fas fa-trash"></i>
//                                         </button>

//                                     </td>
//                                 </tr>
//                             )
//                         })}
//                 </tbody>

//             </table>

//         );
//     }
// }

// const mapStateToProps = state => {
//     return {
//         listUsers: state.admin.users
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
//         deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);

import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./TableManageUser.scss";

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
      <section>
        <table className="col-12">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
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
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger "
                        style={{ fontSize: "1.2rem" }}
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
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
