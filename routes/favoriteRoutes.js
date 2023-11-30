import {
  addToFavorites,
  removeFromFavorites,
} from "../controller/favoriteCrtl.js";
import { authMiddleware } from "../middleware/verifyToken.js";
import express from "express";

const router = express.Router();

router.post("/:movieId/addFavorite", authMiddleware, addToFavorites);
router.delete("/:movieId/removeFavorite", authMiddleware, removeFromFavorites);

export default router;
