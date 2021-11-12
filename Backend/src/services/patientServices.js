import db from "../models/index";
require("dotenv").config();
import sendMailServices from "./sendMailServices";
let postBookAppointMent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorID ||
        !data.timeType ||
        !data.date ||
        !data.numberPhone ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        await sendMailServices.postSendMail({
          reciverEmail: data.email,
          patientName: "Long Nguyen",
          time: "8:00 - 9:00 Chủ nhật 1/1/2021",
          doctorName: "Dương Thị Phương",
          redirecLink: "https://www.youtube.com/",
        });

        //upsert patient
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleID: "R3",
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
              address: data.address,
              numberPhone: data.numberPhone,
              timeType: data.timeType,
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

module.exports = {
  postBookAppointMent: postBookAppointMent,
};
