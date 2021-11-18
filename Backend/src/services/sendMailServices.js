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
    from: '"ISOFHCARE OF BRODEV" <sendmailwithme@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông Tin Đặt Lịch Khám Bệnh", // Subject line
    text: "Hello world?", // plain text body
    html: getBodyHTMLEmail(dataSend), // html body
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3> Xin chào, ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên ISOFHCARE</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

    <p>Vui lòng kiểm tra thông tin trước khi tiến hành xác nhận thủ tục hoàn tất. Nếu đã kiểm tra đúng thông tin vui lòng click vào link bên dưới để xác nhận hoàn tất thủ tục đặt lịch khám bệnh trực tuyến thành công tại ISOFHCARE </p>
    <div><a href= ${dataSend.redirecLink} target="_blank">Click Here</a></div>
    <div>Xin chân thành cảm ơn !</div>
    `;
  }

  if (dataSend.language === "en") {
    result = `
    <h3> Dear !, ${dataSend.patientName}!</h3>
    <p>You are got this email because was set up the history on ISOFHCARE</p>
    <p>Information to schedule an appointment:</p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>

    <p>Please check the information before proceeding to confirm the procedure is complete. If you have checked the correct information, please click on the link below to confirm the successful completion of the online medical appointment booking procedure at ISOFHCARE</p>
    <div><a href= ${dataSend.redirecLink} target="_blank">Click Here</a></div>
    <div>Thank you so much !</div>
    `;
  }

  return result;
};

let getBodyHTMLEmailConfirm = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3> Xin chào, ${dataSend.patientName} !</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online THÀNH CÔNG trên ISOFHCARE</p>
    <p>Thông tin được gửi trong file đính kèm bên dưới:</p>
    <div>Xin chân thành cảm ơn !</div>
    `;
  }

  if (dataSend.language === "en") {
    result = `
    <h3> Dear ${dataSend.patientName} !,</h3>
    <p>You are got this email because was set up the history SUCCESS on ISOFHCARE</p>
    <p>News sent in attachment:</p>
    <div>Thank you so much !</div>
    `;
  }

  return result;
};

let sendAtTachMent = async (dataSend) => {
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
    from: '"ISOFHCARE OF BRODEV" <sendmailwithme@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Thông Tin Đặt Lịch Khám Bệnh", // Subject line
    text: "Hello world?", // plain text body
    html: getBodyHTMLEmailConfirm(dataSend), // html body
    attachments: [
      {
        filename: `ISOFHCAREOFBRODEV- ${new Date().getTime()}.png`,
        content: dataSend.imgbase64.split("base64,")[1],
        encoding: "base64",
      },
    ],
  });
};

module.exports = {
  postSendMail: postSendMail,
  sendAtTachMent: sendAtTachMent,
};
