const { reject } = require("lodash");
const db = require("../models");

let postCreateNewSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkDown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        await db.Specialty.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkDown: data.descriptionMarkDown,
        });

        resolve({
          errCode: 0,
          errMessage: "create new specialty success !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "OK",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailSpecialtyByID = (inputID, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputID || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        let data = await db.Specialty.findOne({
          where: { id: inputID },
          attributes: ["descriptionHTML", "descriptionMarkDown"],
        });

        if (data) {
          let doctorSpecialty = [];
          if (location === "ALL") {
            doctorSpecialty = await db.Doctor_Info.findAll({
              where: { specialtyID: inputID },
              attributes: ["doctorID", "provinceID"],
            });
          } else {
            //find by location
            doctorSpecialty = await db.Doctor_Info.findAll({
              where: { specialtyID: inputID, provinceID: location },
              attributes: ["doctorID", "provinceID"],
            });
          }

          data.doctorSpecialty = doctorSpecialty;
        } else data = {};

        resolve({
          errCode: 0,
          errMessage: "OK",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postCreateNewSpecialty: postCreateNewSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyByID: getDetailSpecialtyByID,
};
