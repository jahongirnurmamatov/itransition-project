import express from 'express';
import { blockUsers, deleteUsers, getAllUsers, searchUsers, unBlockUsers, userRoleChange } from '../controller/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();    

router.post('/role-change',verifyToken,verifyAdmin,userRoleChange);
router.post('/block',verifyToken,verifyAdmin,blockUsers);
router.post('/unblock',verifyToken,verifyAdmin,unBlockUsers);
router.post('/delete',verifyToken,verifyAdmin,deleteUsers);
router.get('/get-users',verifyToken,verifyAdmin,getAllUsers);
router.get('/search-users',verifyToken,searchUsers);

export default router;