const { reject } = require("lodash");
const db = require("../models");

let postCreateNewHandBook = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.info ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkDown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        await db.HandBook.create({
          name: data.name,
          info: data.info,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkDown: data.descriptionMarkDown,
        });

        resolve({
          errCode: 0,
          errMessage: "create new handbook success !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllHandBook = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.HandBook.findAll();
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

let getDetailHandBookByID = (inputID) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputID) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        let data = await db.HandBook.findOne({
          where: { id: inputID },
          attributes: [
            "name",
            "info",
            "image",
            "descriptionHTML",
            "descriptionMarkDown",
          ],
        });
        // if (data) {
        //   let doctorHandBook = [];
        //   doctorClinic = await db.Doctor_Info.findAll({
        //     where: { clinicID: inputID },
        //     attributes: ["doctorID"],
        //   });

        //   data.doctorHandBook = doctorHandBook;
        // } else data = {};

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
  postCreateNewHandBook: postCreateNewHandBook,
  getAllHandBook: getAllHandBook,
  getDetailHandBookByID: getDetailHandBookByID,
};
