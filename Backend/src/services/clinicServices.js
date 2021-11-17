const db = require("../models");

let postCreateNewClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkDown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkDown: data.descriptionMarkDown,
        });

        resolve({
          errCode: 0,
          errMessage: "create new clinic success !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();
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

let getDetailClinicByID = (inputID) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputID) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: { id: inputID },
          attributes: [
            "name",
            "address",
            "image",
            "descriptionHTML",
            "descriptionMarkDown",
          ],
        });
        if (data) {
          let doctorClinic = [];
          doctorClinic = await db.Doctor_Info.findAll({
            where: { clinicID: inputID },
            attributes: ["doctorID", "provinceID"],
          });

          data.doctorClinic = doctorClinic;
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
  postCreateNewClinic: postCreateNewClinic,
  getAllClinic: getAllClinic,
  getDetailClinicByID: getDetailClinicByID,
};
