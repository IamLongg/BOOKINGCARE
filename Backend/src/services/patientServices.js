import db from "../models/index";
require("dotenv").config();
import sendMailServices from "./sendMailServices";
import { v4 as uuidv4 } from "uuid";
import { reject } from "lodash";

let buildURLToken = (doctorID, token) => {
  let result = `${process.env.URL_REACT}/verify-booking-ISOFHCARE?token=${token}&doctorID=${doctorID}`;
  return result;
};

let postBookAppointMent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorID ||
        !data.timeType ||
        !data.date ||
        !data.numberPhone ||
        !data.address ||
        !data.fullName ||
        !data.selectedGender
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        let token = uuidv4();
        await sendMailServices.postSendMail({
          reciverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirecLink: buildURLToken(data.doctorID, token),
        });

        //upsert patient
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleID: "R3",
            lastName: data.fullName,
            address: data.address,
            gender: data.selectedGender,
            numberPhone: data.numberPhone,
          },
        });

        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientID: user[0].id },
            defaults: {
              statusID: "S1",
              doctorID: data.doctorID,
              patientID: user[0].id,
              date: data.date,
              email: data.email,
              numberPhone: data.numberPhone,
              timeType: data.timeType,
              token: token,
            },
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

let postVerifyBookAppointMent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorID) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: { doctorID: data.doctorID, token: data.token, statusID: "S1" },
          raw: false,
        });

        if (appointment) {
          appointment.statusID = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Activated successfully !",
          });
        } else {
          resolve({
            errCode: 3,
            errMessage:
              "Medical appointment has been activated or does not exist !",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postBookAppointMent: postBookAppointMent,
  postVerifyBookAppointMent: postVerifyBookAppointMent,
};
