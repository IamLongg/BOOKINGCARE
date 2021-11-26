import axios from "axios";

const baseURL = "http://localhost:8080";

const handleLoginApi = (email, password) => {
  return axios.post(`${baseURL}/api/login`, { email, password });
};

const getAllUsers = (id) => {
  return axios.get(`${baseURL}/api/get-all-users?id=${id}`);
};

const createNewUserService = (data) => {
  return axios.post(`${baseURL}/api/create-new-user`, data);
};

const deleteUser = (id) => {
  return axios.delete(`${baseURL}/api/delete-user`, { data: { id } });
};

const editUserApi = (data) => {
  return axios.put(`${baseURL}/api/edit-user`, data);
};

const getALLCodeSerVice = (inputType) => {
  return axios.get(`${baseURL}/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`${baseURL}/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
  return axios.get(`${baseURL}/api/get-all-doctors`);
};

const saveDetailInfoDoctor = (data) => {
  return axios.post(`${baseURL}/api/post-info-doctors`, data);
};

const getDetailInfoDoctor = (id) => {
  return axios.get(`${baseURL}/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post(`${baseURL}/api/bulk-create-schedule`, data);
};

const getScheduleDoctorByDate = (doctorID, date) => {
  return axios.get(
    `${baseURL}/api/get-schedule-doctor-by-date?doctorID=${doctorID}&date=${date}`
  );
};

const getInfoDoctorScheduleById = (doctorID) => {
  return axios.get(
    `${baseURL}/api/get-info-doctor-schedule-by-id?doctorID=${doctorID}`
  );
};

const getProfileDoctor = (doctorID) => {
  return axios.get(`${baseURL}/api/get-profile-doctor?doctorID=${doctorID}`);
};

const postBookAppointMent = (data) => {
  return axios.post(`${baseURL}/api/patient-book-appointment`, data);
};

const postVerifyBookAppointMent = (data) => {
  return axios.post(`${baseURL}/api/verify-book-appointment`, data);
};

const postCreateNewSpecialty = (data) => {
  return axios.post(`${baseURL}/api/create-new-specialty`, data);
};

const getAllSpecialty = () => {
  return axios.get(`${baseURL}/api/get-all-specialty`);
};

const getDetailSpecialtyByID = (data) => {
  return axios.get(
    `${baseURL}/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};

const postCreateNewClinic = (data) => {
  return axios.post(`${baseURL}/api/create-new-clinic`, data);
};

const postCreateNewHandBook = (data) => {
  return axios.post(`${baseURL}/api/create-new-handbook`, data);
};

const getAllClinic = () => {
  return axios.get(`${baseURL}/api/get-all-clinic`);
};

const getDetailClinicByID = (data) => {
  return axios.get(`${baseURL}/api/get-detail-clinic-by-id?id=${data.id}`);
};

const getDetailHandBookByID = (id) => {
  return axios.get(`${baseURL}/api/get-detail-handbook-by-id?id=${id}`);
};

const getAllHandBook = () => {
  return axios.get(`${baseURL}/api/get-all-handbook`);
};

const getListPatientForDoctor = (data) => {
  return axios.get(
    `${baseURL}/api/get-list-patient-for-doctor?doctorID=${data.id}&date=${data.date}`
  );
};

const postSendConfirm = (data) => {
  return axios.post(`${baseURL}/api/send-confirm`, data);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUser,
  editUserApi,
  getALLCodeSerVice,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailInfoDoctor,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getInfoDoctorScheduleById,
  getProfileDoctor,
  postBookAppointMent,
  postVerifyBookAppointMent,
  postCreateNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyByID,
  postCreateNewClinic,
  postCreateNewHandBook,
  getAllClinic,
  getAllHandBook,
  getDetailClinicByID,
  getDetailHandBookByID,
  getListPatientForDoctor,
  postSendConfirm,
};
