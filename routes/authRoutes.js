import {
  register,
  login,
  loginAdmin,
  passwordLink,
  verifyUrl,
  resetPassword,
} from "../controller/authCrtl.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin", loginAdmin);
router.post("/passwordreset", passwordLink);
router.get("/:id/:token", verifyUrl);
router.post("/:id/:token", resetPassword);

export default router;
