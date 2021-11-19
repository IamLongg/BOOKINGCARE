import doctorServices from "../services/doctorServices";

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 25;
  try {
    let response = await doctorServices.getTopDoctorHome(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorServices.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the service",
    });
  }
};

let postInfoDoctors = async (req, res) => {
  try {
    let response = await doctorServices.saveDetailInfoDoctors(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the service",
    });
  }
};

let getDetailDoctorById = async (req, res) => {
  try {
    let info = await doctorServices.getDetailDoctorById(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the service",
    });
  }
};

let bulkCreateSchedule = async (req, res) => {
  try {
    let info = await doctorServices.bulkCreateSchedule(req.body);
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the service",
    });
  }
};

let getScheduleDoctorByDate = async (req, res) => {
  try {
    let info = await doctorServices.getScheduleDoctorByDate(
      req.query.doctorID,
      req.query.date
    );
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the service",
    });
  }
};

let getInfoDoctorScheduleById = async (req, res) => {
  try {
    let info = await doctorServices.getInfoDoctorScheduleById(
      req.query.doctorID
    );
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the service",
    });
  }
};

let getProfileDoctor = async (req, res) => {
  try {
    let info = await doctorServices.getProfileDoctor(req.query.doctorID);
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the service",
    });
  }
};

let getListPatientForDoctor = async (req, res) => {
  try {
    let info = await doctorServices.getListPatientForDoctor(
      req.query.doctorID,
      req.query.date
    );
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the service",
    });
  }
};

let sendConfirm = async (req, res) => {
  try {
    let info = await doctorServices.sendConfirm(req.body);
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the service",
    });
  }
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postInfoDoctors: postInfoDoctors,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleDoctorByDate: getScheduleDoctorByDate,
  getInfoDoctorScheduleById: getInfoDoctorScheduleById,
  getProfileDoctor: getProfileDoctor,
  getListPatientForDoctor: getListPatientForDoctor,
  sendConfirm: sendConfirm,
};
