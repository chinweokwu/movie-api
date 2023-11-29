import express from 'express';
import authRoute from "./routes/authRoutes.js"
import moviesRoute from "./routes/movieRoutes.js"
import userRoute from "./routes/userRoutes.js"
import listRoute from "./routes/listRoutes.js"
import dbConnect from './config/dbConnect.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

dbConnect();
app.use(express.json())
app.use("/api/auth", authRoute);
app.use("/api/auth", userRoute);
app.use("/api/auth", listRoute);
app.use("/api/auth", moviesRoute);

const port  = process.env.PORT || 8080
app.listen(port, ()=> {
  console.log(`Backend server Started on port ${port}`)
})
