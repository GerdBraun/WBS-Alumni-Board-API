import nodemailer from "nodemailer";
import { asyncWrapper } from "../utils/asyncWrapper.js";

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });


export const sendMail = asyncWrapper(async (req, res, next) => {
// send mail with defined transport object
const info = await transporter.sendMail({
    from: '"FULLSTACK.team" <'+process.env.MAIL_USER+'>', // sender address
    to: process.env.MAIL_USER, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  res.json({ message: `email ${info.messageId} sent`});
});
