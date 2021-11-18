import db from "../models/index";
import CRUDServices from "../services/CRUDServices";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDServices.createNewUser(req.body);
  console.log(message);
  return res.send("post crud from sever");
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDServices.getAllUser();
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let editCRUD = async (req, res) => {
  let userID = req.query.id;
  if (userID) {
    let userData = await CRUDServices.getUserInfoById(userID);
    // console.log(userData);
    return res.render("editUser.ejs", {
      user: userData,
    });
  } else {
    return res.send("edit not found");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let allUser = await CRUDServices.updateUserData(data);
  return res.render("displayCRUD.ejs", {
    dataTable: allUser,
  });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let allUser = await CRUDServices.deleteUserById(id);
    return res.render("displayCRUD.ejs", {
      dataTable: allUser,
    });
  } else {
    return res.send("delete user unsuccess");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  editCRUD: editCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
