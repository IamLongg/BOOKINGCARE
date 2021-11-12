require("dotenv").config();
import nodemailer from "nodemailer";

let postSendMail = async (dataSend) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"test send mail" <sendmailwithme@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông Tin Đặt Lịch Khám Bệnh", // Subject line
    text: "Hello world?", // plain text body
    html: `
    <h3> Xin chào, ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên ISOFHCARE</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

    <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thử tục đặt lịch khám bệnh. </p>
    <div><a href= ${dataSend.redirecLink} target="_blank">Click Here</a></div>
    <div>Xin chân thành cảm ơn !</div>
    `, // html body
  });
};

module.exports = {
  postSendMail: postSendMail,
};
