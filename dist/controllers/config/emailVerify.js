"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (email, token) => {
    const baseURL = "http://localhost:2002";
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        port: 587,
        auth: {
            user: "devsangola5@gmail.com",
            pass: "hryy upwd vpew ixcw",
        },
    });
    transporter
        .sendMail({
        from: "devsangola5@gmail.com",
        to: email,
        subject: "Email verification",
        html: `<html>
      <body style="font-family: Arial, Helvetica, sans-serif; padding:0.5rem;">
            <p style="font-size: 1.6rem;">Clique no link abaixo, ou cole no navegador para verificar o seu email</p>
            <a style="font-size: 1.3rem; background-color: rgb(192, 192, 192); padding: 0.4rem; border-radius: 1rem; text-decoration: none;" href='${baseURL}/user/verify-email/${token}' target="_blank">Clique aqui</a>
      </body>
  </html>`,
    })
        .then((res) => {
        console.log({ res });
    })
        .catch((error) => {
        console.log({ message: error.message });
    });
};
exports.sendEmail = sendEmail;
