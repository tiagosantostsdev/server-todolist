import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const mongodbURI:string = String(process.env.MONGODB_URI)
    await mongoose.connect(mongodbURI);
    console.log({ message: "mongodb has been connected" });
  } catch (error) {
    if (error instanceof Error) {
      return console.error({ message: error.message });
    }
  }
};