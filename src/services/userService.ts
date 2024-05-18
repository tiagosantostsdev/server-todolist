import { User } from "../models/userModel";

export const createUser = (values: Record<string, any>) => User.create(values);

export const findUser = () => User.find();

export const findUserByEmail = (email: string) =>
  User.findOne({ email: email });

export const findOneUser = (id: string) => User.findOne({ _id: id });

export const updateUser = (values: Record<string, any>) =>
  User.findOneAndUpdate({ _id: values.id }, { username: values.username });

export const deleteUser = (id: string) => User.findOneAndDelete({ _id: id });
