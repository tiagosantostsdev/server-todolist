import express from "express";
import jwt from "jsonwebtoken";
import { findUserById } from "../services/userService";

export const authUser = async (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.sendStatus(401);
    }

    const parts = authorization.split(" ");
    if (parts.length !== 2) {
      return res.sendStatus(401);
    }

    const [schema, token] = parts;
    if (schema !== "Bearer") {
      return res.sendStatus(401);
    }
    const SECRET_JWT: string = String(process.env.SECRET_JWT);
    jwt.verify(token, SECRET_JWT, async (error: any, decoded: any) => {
      if (error) {
        return res.status(400).send({ message: error.message });
      }
      const user = await findUserById(decoded.id);
      if (!user || !user.id) {
        return res.status(400).send({ message: "Invalid token" });
      }
      req.userId = user.id;
      next();
    });
  } catch (error: any) {
    console.error({ message: error.message });
    return res.status(400).send({ message: error.message });
  }
};
