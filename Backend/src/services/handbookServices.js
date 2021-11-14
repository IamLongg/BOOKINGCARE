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

module.exports = {
  postCreateNewHandBook: postCreateNewHandBook,
};