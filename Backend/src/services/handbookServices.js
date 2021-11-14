const db = require("../models");

let postCreateNewHandBook = (data) => {
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
        await db.HandBook.create({
          name: data.name,
          address: data.address,
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

module.exports = {
  postCreateNewHandBook: postCreateNewHandBook,
};
