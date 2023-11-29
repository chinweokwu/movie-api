import mongoose from "mongoose";

const MONGO_URL = "mongodb+srv://movie-app:movie-app@cluster0.mlzcyvg.mongodb.net/";
const dbConnect = async () => {
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(MONGO_URL);

    console.log("Connection to DB was a success");
  } catch (error) {
    console.error(error);
    console.log("Could not connect to DB");
  }
};

export default dbConnect;
