import { getUser, getUsers, updateUser , deleteUser,  userStats} from '../controller/userCrtl.js';
import { authMiddleware,  adminAuthMiddleware } from "../middleware/verifyToken.js";
import express from 'express';

const router = express.Router();

router.get('/all-users',  authMiddleware, adminAuthMiddleware, getUsers);
router.get('/single-user/:id', authMiddleware, getUser);
router.put('/edit-user/:id', authMiddleware, updateUser);
router.delete('/delete-user/:id', authMiddleware, deleteUser);
router.get('/user-stats/', authMiddleware, userStats);

export default router;
