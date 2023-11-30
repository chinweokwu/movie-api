import express from 'express';
import authRoute from "./routes/authRoutes.js"
import movieRoute from "./routes/moviesRoutes.js"
import userRoute from "./routes/userRoutes.js"
import favoriteRoute from "./routes/favoriteRoutes.js"
import listRoute from "./routes/listRoutes.js"
import dbConnect from './config/dbConnect.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

dbConnect();
app.use(express.json())
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/list", listRoute);
app.use("/api/movie", movieRoute);
app.use("/api/favorite", favoriteRoute);

const port  = process.env.PORT || 8080
app.listen(port, ()=> {
  console.log(`Backend server Started on port ${port}`)
})
