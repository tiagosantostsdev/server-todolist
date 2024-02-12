import mongoose from "mongoose";

export const dbConnection = () => {
  const Db_URI: string = String(process.env.MONGODB_URI || "");
  try {
    mongoose.connect(Db_URI);
    console.log({ message: "mongodb connected" });
  } catch (error) {
    console.log({ message: error });
  }
};
