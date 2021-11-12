import patientServices from "../services/patientServices";

let postBookAppointMent = async (req, res) => {
  try {
    let info = await patientServices.postBookAppointMent(req.body);
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the service",
    });
  }
};

let postVerifyBookAppointMent = async (req, res) => {
  try {
    let info = await patientServices.postVerifyBookAppointMent(req.body);
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the service",
    });
  }
};

module.exports = {
  postBookAppointMent: postBookAppointMent,
  postVerifyBookAppointMent: postVerifyBookAppointMent,
};
