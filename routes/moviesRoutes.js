import {
  createMovie,
  getMovie,
  getMovies,
  updateMovies,
  deleteMovie,
  getRandomMovie
} from "../controller/moviesCrtl.js";
import {
  authMiddleware,
  adminAuthMiddleware,
} from "../middleware/verifyToken.js";
import express from "express";

const router = express.Router();
router.post("/create-movie", authMiddleware, adminAuthMiddleware, createMovie);
router.get("/all-movies", authMiddleware, getMovies);
router.get("/random-movie",  authMiddleware, getRandomMovie)
router.get("/single-movie/:id", authMiddleware, getMovie);
router.put(
  "/edit-movie/:id",
  authMiddleware,
  adminAuthMiddleware,
  updateMovies
);
router.delete(
  "/delete-movie/:id",
  authMiddleware,
  adminAuthMiddleware,
  deleteMovie
);

export default router;
