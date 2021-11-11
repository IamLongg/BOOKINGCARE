import db from "../models/index";
require("dotenv").config();

let postBookAppointMent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorID || !data.timeType || !data.date) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
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
