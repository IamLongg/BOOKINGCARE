import handbookServices from "../services/handbookServices";

let postCreateNewHandBook = async (req, res) => {
  try {
    let info = await handbookServices.postCreateNewHandBook(req.body);
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the service",
    });
  }
};

let getAllHandBook = async (req, res) => {
  try {
    let info = await handbookServices.getAllHandBook();
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the service",
    });
  }
};

let getDetailHandBookByID = async (req, res) => {
  try {
    let info = await handbookServices.getDetailHandBookByID(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the service",
    });
  }
};

module.exports = {
  postCreateNewHandBook: postCreateNewHandBook,
  getAllHandBook: getAllHandBook,
  getDetailHandBookByID: getDetailHandBookByID,
};
