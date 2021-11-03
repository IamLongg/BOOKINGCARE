// import actionTypes from "./actionTypes";
// import {
//   getALLCodeSerVice,
//   createNewUserService,
//   getAllUsers,
//   deleteUser,
//   editUserApi,
//   getTopDoctorHomeService,
// } from "../../services/userService";
// import { toast } from "react-toastify";
// import { get } from "lodash";
// // export const fetchGenderStart = () => ({
// //   type: actionTypes.FETCH_GENDER_START,
// // });

// export const fetchGenderStart = () => {
//   return async (dispatch, getState) => {
//     try {
//       dispatch({
//         type: actionTypes.FETCH_GENDER_START,
//       });
//       let res = await getALLCodeSerVice("GENDER");
//       if (res && res.errCode === 0) {
//         dispatch(fetchGenderSuccess(res.data));
//       } else {
//         dispatch(fetchGenderFailed());
//       }
//     } catch (error) {
//       dispatch(fetchGenderFailed());
//       console.log("error", error);
//     }
//   };
// };

// export const fetchGenderSuccess = (genderData) => ({
//   type: actionTypes.FETCH_GENDER_SUCCESS,
//   data: genderData,
// });

// export const fetchGenderFailed = () => ({
//   type: actionTypes.FETCH_GENDER_FAIDED,
// });

// export const fetchPositionSuccess = (positionData) => ({
//   type: actionTypes.FETCH_POSITION_SUCCESS,
//   data: positionData,
// });

// export const fetchPositionFailed = () => ({
//   type: actionTypes.FETCH_POSITION_FAILDED,
// });

// export const fetchRoleSuccess = (roleData) => ({
//   type: actionTypes.FETCH_ROLE__SUCCESS,
//   data: roleData,
// });
// export const fetchRoleFailed = () => ({
//   type: actionTypes.FETCH_ROLE_FAILDED,
// });

// export const fetchPositionStart = () => {
//   return async (dispatch, getState) => {
//     try {
//       let res = await getALLCodeSerVice("POSITION");
//       if (res && res.errCode === 0) {
//         dispatch(fetchPositionSuccess(res.data));
//       } else {
//         dispatch(fetchPositionFailed());
//       }
//     } catch (error) {
//       dispatch(fetchPositionFailed());
//       console.log("error", error);
//     }
//   };
// };

// export const fetchRoleStart = () => {
//   return async (dispatch, getState) => {
//     try {
//       let res = await getALLCodeSerVice("ROLE");
//       if (res && res.errCode === 0) {
//         dispatch(fetchRoleSuccess(res.data));
//       } else {
//         dispatch(fetchRoleFailed());
//       }
//     } catch (error) {
//       dispatch(fetchRoleFailed());
//       console.log("error", error);
//     }
//   };
// };

// export const createNewUser = (data) => {
//   return async (dispatch, getState) => {
//     try {
//       let res = await createNewUserService(data);
//       if (res && res.errCode === 0) {
//         toast.success("Create a new user success !");
//         dispatch(saveUserSuccess());
//         dispatch(fetchAllUsersStart());
//       } else {
//         dispatch(saveUserFailed());
//       }
//     } catch (error) {
//       dispatch(saveUserFailed());
//       console.log("error", error);
//     }
//   };
// };

// export const saveUserSuccess = () => ({
//   type: actionTypes.CREATE_USER_SUCCESS,
// });

// export const saveUserFailed = () => ({
//   type: actionTypes.CREATE_USER_FAILDED,
// });

// export const fetchAllUsersStart = () => {
//   return async (dispatch, getState) => {
//     try {
//       let res = await getAllUsers("ALL");
//       let res1 = await getTopDoctorHomeService("");
//       if (res && res.errCode === 0) {
//         dispatch(fetchAllUsersSuccess(res.users.reverse));
//       } else {
//         toast.error("Fetch all user error !");
//         dispatch(fetchAllUsersFailed());
//       }
//     } catch (error) {
//       toast.error("Fetch all user error !");
//       dispatch(fetchAllUsersFailed());
//       console.log("error", error);
//     }
//   };
// };

// export const fetchAllUsersSuccess = (data) => ({
//   type: actionTypes.FETCH_ALL_USERS_SUCCESS,
//   users: data,
// });

// export const fetchAllUsersFailed = (data) => ({
//   type: actionTypes.FETCH_ALL_USERS_SUCCESS,
// });

// export const deleteAUser = (id) => {
//   return async (dispatch, getState) => {
//     try {
//       let res = await deleteUser(id);
//       if (res && res.errCode === 0) {
//         toast.success("Delete the user success !");
//         dispatch(deleteUserFailed());
//         dispatch(fetchAllUsersStart());
//       } else {
//         toast.error("Delete the user error !");
//         dispatch(deleteUserFailed());
//       }
//     } catch (error) {
//       toast.error("Delete the user error !");
//       dispatch(deleteUserFailed());
//       console.log("error", error);
//     }
//   };
// };

// export const deleteUserSuccess = () => ({
//   type: actionTypes.DELETE_USER_SUCCESS,
// });

// export const deleteUserFailed = () => ({
//   type: actionTypes.DELETE_USER_FAILDED,
// });

// export const editAUser = (data) => {
//   return async (dispatch, getState) => {
//     try {
//       let res = await editUserApi(data);
//       if (res && res.errCode === 0) {
//         toast.success("Update the user success !");
//         dispatch(editUserSuccess());
//         dispatch(fetchAllUsersStart());
//       } else {
//         toast.error("Update the user error !");
//         dispatch(editUserFailed());
//       }
//     } catch (error) {
//       toast.error("Update the user error !");
//       dispatch(editUserFailed());
//       console.log("error", error);
//     }
//   };
// };

// export const editUserSuccess = () => ({
//   type: actionTypes.EDIT_USER_SUCCESS,
// });

// export const editUserFailed = () => ({
//   type: actionTypes.EDIT_USER_FAILDED,
// });

// export const fetchTopDoctor = () => {
//   return async (dispatch, getState) => {
//     try {
//       let res = await getTopDoctorHomeService("2");
//       if (res && res.errCode === 0) {
//         dispatch({
//           type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
//           dataDoctor: res.data,
//         });
//       } else {
//         dispatch({
//           type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
//         });
//       }
//     } catch (error) {
//       console.log("FETCH_TOP_DOCTOR_FAILDED", error);
//       dispatch({
//         type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
//       });
//     }
//   };
// };

import actionTypes from "./actionTypes";
import {
  getALLCodeSerVice,
  createNewUserService,
  getAllUsers,
  deleteUser,
  editUserApi,
  getTopDoctorHomeService,
} from "../../services/userService";
import { toast } from "react-toastify";
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getALLCodeSerVice("GENDER");
      if (res && res.data.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log(e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAIDED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getALLCodeSerVice("POSITION");
      if (res && res.data.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log(e);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILDED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getALLCodeSerVice("ROLE");
      if (res && res.data.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log(e);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILDED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log("check create user redux:", res);
      if (res && res.data.errCode === 0) {
        toast.success("Create new user success !");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log(e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILDED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.data.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.data.users.reverse()));
      } else {
        toast.error("Fetch all user error !");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error("Fetch all user error !");
      dispatch(fetchAllUsersFailed());
      console.log(e);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFailed = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteOfUser = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUser(id);
      if (res && res.data.errCode === 0) {
        toast.success("Delete the user success !");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Delete the user error !");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      dispatch(deleteUserFailed());
      console.log(e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILDED,
});

export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserApi(data);
      if (res && res.data.errCode === 0) {
        toast.success("Update the user success !");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Update the user error !");
        dispatch(editUserFailed());
      }
    } catch (e) {
      dispatch(editUserFailed());
      console.log(e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILDED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      console.log("check response", res);
      if (res && res.data.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
      });
    }
  };
};
