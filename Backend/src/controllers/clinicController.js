import clinicServices from "../services/clinicServices";

let postCreateNewClinic = async (req, res) => {
  try {
    let info = await clinicServices.postCreateNewClinic(req.body);
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the service",
    });
  }
};

module.exports = {
  postCreateNewClinic: postCreateNewClinic,
};
