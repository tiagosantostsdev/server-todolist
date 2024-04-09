import express from "express";
import bcrypt from "bcrypt";
import { findUserLogin, generateToken } from "../services/loginService";

export const userLogin = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) {
      return res.status(400).send({ message: "Please submit all field" });
    }

    const user = await findUserLogin(email);
    if (!user) {
      return res.status(400).send({ message: "User or password not found" });
    }

    const verifyPassword = bcrypt.compareSync(password, user.password);
    if (!verifyPassword) {
      return res.status(400).send({ message: "User or password not found" });
    }

    if(user.isVerified === false){
      return res.status(400).send({message: "Please verify your user email"})
    }

    const token = generateToken(user.id);
    res.status(200).send(token);
  } catch (error: any) {
    console.error({ message: error.message });
    return res.status(400).send({ message: error.message });
  }
};
