import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const configOptions: SMTPTransport.Options = {
  host: process.env.MAIL_CLIENT_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_CLIENT_USER,
    pass: process.env.MAIL_CLIENT_PASS,
  },
};

const mailClient: nodemailer.Transporter = nodemailer.createTransport(
  configOptions
);

export default mailClient;
