import nodemailer from "nodemailer";

export const sendEmail = (email: string, token: string) => {
  const baseURL: string = String(process.env.BASE_URL);
  const user: string = String(process.env.USER_EMAIL);
  const pass: string = String(process.env.USER_PASS);

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

  transporter
    .sendMail({
      from: user,
      to: email,
      subject: "Email verification",
      html: `<html>
      <body style="font-family: Arial, Helvetica, sans-serif; padding:0.5rem;">
            <p style="font-size: 1.6rem;">Clique no link abaixo para verificar o seu email</p>
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
