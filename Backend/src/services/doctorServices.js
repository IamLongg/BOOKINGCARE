import db from "../models/index";
require("dotenv").config();
import _, { reject } from "lodash";
import sendMailServices from "../services/sendMailServices";

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limit,
        where: { roleID: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Doctor_Info,
            attributes: {
              exclude: ["id", "doctorID"],
            },
          },
        ],
        raw: true,
        nest: true,
      });

      resolve({
        errCode: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleID: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });

      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let checkRequiredFields = (data) => {
  let arr = [
    "doctorID",
    "contentHTML",
    "contentMarkDown",
    "action",
    "selectedPrice",
    "selectedPayment",
    "selectedProvince",
    "nameClinic",
    "addressClinic",
    "specialtyID",
    "note",
  ];

  let isValid = true;
  let element = "";
  for (let i = 0; i < arr.length; i++) {
    if (!data[arr[i]]) {
      isValid = false;
      element = arr[i];
      break;
    }
  }

  return {
    isValid: isValid,
    element: element,
  };
};

let saveDetailInfoDoctors = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkObj = checkRequiredFields(data);
      if (checkObj.isValid === false) {
        resolve({
          errCode: 1,
          errMessage: `Missing parameters : ${checkObj.element}`,
        });
      } else {
        // upsert to Markdown

        if (data.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: data.contentHTML,
            contentMarkDown: data.contentMarkDown,
            description: data.description,
            doctorID: data.doctorID,
          });
        } else if (data.action === "EDIT") {
          let doctorMarkdown = await db.Markdown.findOne({
            where: { doctorID: data.doctorID },
            raw: false,
          });

          if (doctorMarkdown) {
            doctorMarkdown.contentHTML = data.contentHTML;
            doctorMarkdown.contentMarkDown = data.contentMarkDown;
            doctorMarkdown.description = data.description;
            await doctorMarkdown.save();
          }
        }

        // upsert to Doctor_info

        let doctorInfo = await db.Doctor_Info.findOne({
          where: { doctorID: data.doctorID },
          raw: false,
        });

        if (doctorInfo) {
          //update
          doctorInfo.doctorID = data.doctorID;
          doctorInfo.priceID = data.selectedPrice;
          doctorInfo.paymentID = data.selectedPayment;
          doctorInfo.provinceID = data.selectedProvince;
          doctorInfo.nameClinic = data.nameClinic;
          doctorInfo.addressClinic = data.addressClinic;
          doctorInfo.specialtyID = data.specialtyID;
          doctorInfo.clinicID = data.clinicID;
          doctorInfo.note = data.note;
          await doctorInfo.save();
        } else {
          //create
          await db.Doctor_Info.create({
            doctorID: data.doctorID,
            priceID: data.selectedPrice,
            paymentID: data.selectedPayment,
            provinceID: data.selectedProvince,
            nameClinic: data.nameClinic,
            addressClinic: data.addressClinic,
            specialtyID: data.specialtyID,
            clinicID: data.clinicID,
            note: data.note,
          });
        }

        resolve({
          errCode: 0,
          errMessage: "Save info doctor success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailDoctorById = (idInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idInput) {
        resolve({
          errCode: -1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: idInput },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkDown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Doctor_Info,
              attributes: {
                exclude: ["id", "doctorID"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });

        if (data && data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }

        if (!data) data = {};

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let bulkCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.doctorID || !data.formatedDate) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }

        // console.log("check data: data send:", schedule);

        let existing = await db.Schedule.findAll({
          where: { doctorID: data.doctorID, date: data.formatedDate },
          attributes: ["timeType", "date", "doctorID", "maxNumber"],
          raw: true,
        });

        // // lay data da ton tai
        // if (existing && existing.length > 0) {
        //   existing = existing.map((item) => {
        //     item.date = new Date(item.date).getTime();
        //     return item;
        //   });
        // }

        // so sanh date vs timeType
        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });

        // create data
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getScheduleDoctorByDate = (doctorID, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorID || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let dataSchedule = await db.Schedule.findAll({
          where: { doctorID: doctorID, date: date },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.User,
              as: "doctorData",
              attributes: ["firstName", "lastName"],
            },
          ],
          raw: false,
          nest: true,
        });

        if (!dataSchedule) dataSchedule = [];

        resolve({
          errCode: 0,
          data: dataSchedule,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getInfoDoctorScheduleById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Doctor_Info.findOne({
          where: { doctorID: id },
          attributes: {
            exclude: ["id", "doctorID"],
          },
          include: [
            {
              model: db.Allcode,
              as: "priceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "provinceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "paymentTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });

        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getProfileDoctor = (idInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: idInput },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkDown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Doctor_Info,
              attributes: {
                exclude: ["id", "doctorID"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });

        if (data && data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }

        if (!data) data = {};

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getListPatientForDoctor = (doctorID, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorID || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Booking.findAll({
          where: {
            statusID: "S2",
            doctorID: doctorID,
            date: date,
          },
          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: [
                "email",
                "lastName",
                "numberPhone",
                "address",
                "gender",
              ],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "timeTypeDataPaTient",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let sendConfirm = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.email ||
        !data.doctorID ||
        !data.patientID ||
        !data.timeType
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        //update patient status
        let appointment = await db.Booking.findOne({
          where: {
            doctorID: data.doctorID,
            id: data.id,
            patientID: data.patientID,
            timeType: data.timeType,
            statusID: "S2",
          },
          raw: false,
        });

        if (appointment) {
          appointment.statusID = "S3";
          await appointment.save();
        }
        //send email
        await sendMailServices.sendAtTachMent(data);

        await db.Booking.destroy({
          where: { id: data.id },
        });

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  saveDetailInfoDoctors: saveDetailInfoDoctors,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleDoctorByDate: getScheduleDoctorByDate,
  getInfoDoctorScheduleById: getInfoDoctorScheduleById,
  getProfileDoctor: getProfileDoctor,
  getListPatientForDoctor: getListPatientForDoctor,
  sendConfirm: sendConfirm,
};
