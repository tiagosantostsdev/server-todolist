import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  createUser,
  deleteUser,
  findOneUser,
  findUser,
  findUserById,
  updateUser,
} from "../services/userService";
import { generateToken } from "../services/loginService";
import { sendEmail } from "../config/emailVerify";


export const Create = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email,date, gender, password } = req.body as {
      username: string;
      email: string;
      date: string;
      gender: string;
      password: string;
    };
    if (!username || !email || !date || !gender || !password) {
      return res.status(400).send({ message: "Please submit all field" });
    }

    const hash = bcrypt.hashSync(password, 10);
    const user = await createUser({ username, email, date, gender, password: hash });
    if (!user) {
      return res.status(400).send({ message: "Error creating new user" });
    }

    const token = generateToken(user.id);
    sendEmail(user.email, token);

    res.status(201).send({
      message: "User has been created sucessfully, please verify your email",
    });
  } catch (error: any) {
    console.error({ message: error.message });
    return res.status(400).send({ message: error.message });
  }
};

export const VerifyEmail = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const decoded = jwt.verify(
      req.params.token,
      String(process.env.SECRET_JWT)
    );
    const { id } = decoded as { id: string };
    const user:any = await findOneUser(id);

    user.isVerified = true;
    await user.save();

    res.status(200).send({ message: "User email verified" });
  } catch (error) {
    if (error instanceof Error) {
      console.log({ message: error.message });
      return res.status(500).send({ message: error.message });
    }
  }
};

export const Find = async (req: express.Request, res: express.Response) => {
  try {
    const user = await findUser();
    if (!user) {
      return res.status(404).send({ message: "No users found" });
    }
    res.status(200).send({ Users: user });
  } catch (error: any) {
    console.error({ message: error.message });
    return res.status(500).send({ message: error.message });
  }
};

export const Update = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params as { id: string };
    const { username } = req.body as { username: string };
    if (!username) {
      return res.status(400).send({ message: "Username required" });
    }
    const user = await updateUser({ id, username });
    if (!user) {
      return res.status(400).send({ message: "User can't be updated" });
    }
    res.status(200).send({ message: "Username has been updated" });
  } catch (error: any) {
    console.error({ message: error.message });
    return res.status(500).send({ message: error.message });
  }
};

export const Delete = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params as { id: string };
    const user = await deleteUser(id);
    if (!user) {
      return res.status(400).send({ message: "User can't be deleted" });
    }
    res.status(200).send({ message: "User deleted sucessfully" });
  } catch (error: any) {
    console.error({ message: error.message });
    return res.status(500).send({ message: error.message });
  }
};
