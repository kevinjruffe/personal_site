import nodemailer from "nodemailer";

//const mailClient: nodemailer.Transporter = nodemailer.createTransport({
const mailClient = nodemailer.createTransport({
  host: process.env.MAIL_CLIENT_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_CLIENT_USER,
    pass: process.env.MAIL_CLIENT_PASS,
  },
});

export default mailClient;
