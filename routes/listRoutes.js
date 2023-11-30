import {
  createList,
  deleteList,
  getList
} from "../controller/listCrtl.js";
import {
  authMiddleware,
  adminAuthMiddleware,
} from "../middleware/verifyToken.js";
import express from "express";

const router = express.Router();
router.post("/create-list", authMiddleware, adminAuthMiddleware, createList);
router.delete(
  "/delete-list/:id",
  authMiddleware,
  adminAuthMiddleware,
  deleteList
);
router.post("/get-list", authMiddleware, getList);

export default router;
