import mongoose from "mongoose";

export const dbConnection = async () => {
  const Db_URI: string = await String(process.env.MONGODB_URI || "");
  try {
    mongoose.connect(Db_URI);
    console.log({ message: "mongodb connected" });
  } catch (error) {
    console.log({ message: error });
  }
};
