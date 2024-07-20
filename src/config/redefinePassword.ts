import nodemailer from "nodemailer";

export const RedefinePasswordEmail = (email: string, code: string) => {

  const user = "devsangola5@gmail.com"
  const pass = "hryy upwd vpew ixcw"

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
      user: user,
      pass: pass,
    },
  });

  transporter.sendMail(
    {
      from: user,
      subject: "Redefinição de Senha de usuário",
      to: email,
      html: `
  <html>
  <body style="width:100%;">
      <h2>Digite o código de verificação para redefinir a senha de usuário.</h2>
      <p style="font-size: 1.5rem; text-align: center; border-radius: .5rem; letter-spacing: .6rem; font-weight: bold; padding: .2rem; background-color: rgb(128, 141, 126); width:50%">${code}</p>
  </body>
  </html>`,
    },
    (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(info);
    }
  );
};
