import actionTypes from "./actionTypes";
import {
  getALLCodeSerVice,
  createNewUserService,
  getAllUsers,
  deleteUser,
  editUserApi,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailInfoDoctor,
  getAllSpecialty,
  getAllClinic,
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
        toast.success("Đã tạo thành công!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
        toast.error("Tạo thất bại!");
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
        toast.success("Xóa thành công!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Xóa thất bại!");
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
        toast.success("Cập nhật thành công!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Cập nhật thất bại!");
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

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      console.log("check response", res);
      if (res && res.data.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataAllDoctors: res.data.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILDED,
      });
    }
  };
};

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailInfoDoctor(data);
      console.log("check response", res);
      if (res && res.data.errCode === 0) {
        toast.success("Lưu thông tin chi tiết bác sĩ thành công!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Lưu thông tin chi tiết bác sĩ thất bại!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
        });
      }
    } catch (error) {
      toast.error("Save info detail doctor failed !");
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
      });
    }
  };
};

export const fetchAllHours = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getALLCodeSerVice("TIME");
      console.log("check response", res);
      if (res && res.data.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_HOURS_SUCCESS,
          dataHours: res.data.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_HOURS_FAILDED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_HOURS_FAILDED,
      });
    }
  };
};

export const getRequiredDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START });
      let resPrice = await getALLCodeSerVice("PRICE");
      let resPayment = await getALLCodeSerVice("PAYMENT");
      let resProvince = await getALLCodeSerVice("PROVINCE");
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic();
      if (
        resPrice &&
        resPrice.data.errCode === 0 &&
        resPayment &&
        resPayment.data.errCode === 0 &&
        resProvince &&
        resProvince.data.errCode === 0 &&
        resSpecialty &&
        resSpecialty.data.errCode === 0 &&
        resClinic &&
        resClinic.data.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data.data,
          resPayment: resPayment.data.data,
          resProvince: resProvince.data.data,
          resSpecialty: resSpecialty.data.data,
          resClinic: resClinic.data.data,
        };
        dispatch(fetchRequiredDoctorInfoSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInfoFailed());
      }
    } catch (e) {
      dispatch(fetchRequiredDoctorInfoFailed());
      console.log(e);
    }
  };
};

export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
  data: allRequiredData,
});

export const fetchRequiredDoctorInfoFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
});
