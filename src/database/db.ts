import mongoose from "mongoose";

export const dbConnection = async () => {
  const mongodbURI: string = String(process.env.MONGODB_URI);
  await mongoose
    .connect(mongodbURI)
    .then(() => console.log("MongoDB connected successfully via Mongoose"))
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      process.exit(1);
    });
};
