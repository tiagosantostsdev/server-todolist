import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  createUser,
  deleteUser,
  findOneUser,
  findUser,
  findUserByEmail,
  updateUser,
} from "../services/userService";
import { generateToken } from "../services/loginService";
import { sendEmail } from "../config/emailVerify";
import { RedefinePasswordEmail } from "../config/redefinePassword";

export const Create = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, date, gender, password } = req.body as {
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

    const createdDate = new Date();

    const user = await createUser({
      username,
      email,
      date,
      gender,
      password: hash,
      createdDate: createdDate.toLocaleString("AO", {
        timeZone: "Africa/Luanda",
        weekday: "long",
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }),
    });
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
    const user: any = await findOneUser(id);

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

export const FindUserById = async (req: any, res: express.Response) => {
  try {
    const { userId } = req;
    const user = await findOneUser(userId);
    if (!user) {
      return res.status(404).send({ message: "No users found" });
    }
    res.status(200).send(user);
  } catch (error: any) {
    return (
      res.status(500).send({ message: error.message }) &&
      console.error({ message: error.message })
    );
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

export const ForgoutPassword = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email } = req.body as { email: string };

    if (!email) {
      return res.status(400).send({ message: "Please set a valid email" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).send({ message: "User by email not found" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    user.codeVerify = code;
    await user.save();
    RedefinePasswordEmail(user.email, code);

    res
      .status(200)
      .send({ message: "Code verify was sent at your user email" });
  } catch (error: any) {
    console.error({ message: error.message });
    return res.status(500).send({ message: error.message });
  }
};

export const RedefinePassword = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, code, password } = req.body as {
      email: string;
      code: string;
      password: string;
    };

    if (!email || !code || !password) {
      return res.status(400).send({ message: "Please submit all field" });
    }

    const user = await findUserByEmail(email);
    if (!user || user?.codeVerify !== code) {
      return res
        .status(400)
        .send({ message: "Code invalid or email not found!" });
    }

    const hash = bcrypt.hashSync(password, 10);

    user.password = hash;
    user.codeVerify = undefined;
    await user.save();

    res.status(200).send({ message: "Password has been updated" });
  } catch (error: any) {
    console.error({ message: error.message });
    return res.status(500).send({ message: error.message });
  }
};
