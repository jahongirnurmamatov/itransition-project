import express from 'express';
import { blockUsers, deleteUsers, getAllUsers, getUserById, searchUsers, unBlockUsers, userRoleChange } from '../controller/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();    

router.post('/role-change',verifyToken,verifyAdmin,userRoleChange);
router.put('/block',verifyToken,verifyAdmin,blockUsers);
router.put('/unblock',verifyToken,verifyAdmin,unBlockUsers);
router.delete('/delete',verifyToken,verifyAdmin,deleteUsers);
router.get('/get-users',verifyToken,verifyAdmin,getAllUsers);
router.get('/search-users',verifyToken,searchUsers);
router.get('/:userId',getUserById);

export default router;