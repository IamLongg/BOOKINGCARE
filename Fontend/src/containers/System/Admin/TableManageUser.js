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
