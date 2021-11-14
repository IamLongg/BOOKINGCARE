import specialtyServices from "../services/specialtyServices";

let postCreateNewSpecialty = async (req, res) => {
  try {
    let info = await specialtyServices.postCreateNewSpecialty(req.body);
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the service",
    });
  }
};

let getAllSpecialty = async (req, res) => {
  try {
    let info = await specialtyServices.getAllSpecialty();
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the service",
    });
  }
};

let getDetailSpecialtyByID = async (req, res) => {
  try {
    let info = await specialtyServices.getDetailSpecialtyByID(
      req.query.id,
      req.query.location
    );
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the service",
    });
  }
};

module.exports = {
  postCreateNewSpecialty: postCreateNewSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyByID: getDetailSpecialtyByID,
};
