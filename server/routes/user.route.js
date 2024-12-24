import express from 'express';
import { userRoleChange } from '../controller/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();    

router.post('/role-change',verifyToken,verifyAdmin,userRoleChange);

export default router;