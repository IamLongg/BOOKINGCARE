import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import handbookController from "../controllers/handbookController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.editCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);

  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/post-info-doctors", doctorController.postInfoDoctors);
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleDoctorByDate
  );
  router.get(
    "/api/get-info-doctor-schedule-by-id",
    doctorController.getInfoDoctorScheduleById
  );
  router.get("/api/get-profile-doctor", doctorController.getProfileDoctor);

  router.post(
    "/api/patient-book-appointment",
    patientController.postBookAppointMent
  );
  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppointMent
  );

  router.post(
    "/api/create-new-specialty",
    specialtyController.postCreateNewSpecialty
  );
  router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialtyByID
  );

  router.post("/api/create-new-clinic", clinicController.postCreateNewClinic);
  // router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
  // router.get(
  //   "/api/get-detail-specialty-by-id",
  //   specialtyController.getDetailSpecialtyByID
  // );

  router.post(
    "/api/create-new-handbook",
    handbookController.postCreateNewHandBook
  );
  // router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
  // router.get(
  //   "/api/get-detail-specialty-by-id",
  //   specialtyController.getDetailSpecialtyByID
  // );

  // router.get("/duclong", (req, res) => {
  //   return res.send("hello long");
  // });

  return app.use("/", router);
};

module.exports = initWebRoutes;
