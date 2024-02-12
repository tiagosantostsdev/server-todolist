import express from "express";
import {
  createUser,
  deleteUser,
  findUser,
  updateUser,
} from "../services/userService";

export const Create = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body as {
      username: string;
      email: string;
      password: string;
    };
    if (!username || !email || !password) {
      return res.status(400).send({ message: "Please submit all field" });
    }
    const user = await createUser({ username, email, password });
    if (!user) {
      return res.status(400).send({ message: "Error creating new user" });
    }
    res.status(201).send({ message: "User has been created sucessfully" });
  } catch (error: any) {
    console.error({ message: error.message });
    return res.status(400).send({ message: error.message });
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
    return res.status(400).send({ message: error.message });
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
    return res.status(400).send({ message: error.message });
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
    return res.status(400).send({ message: error.message });
  }
};
