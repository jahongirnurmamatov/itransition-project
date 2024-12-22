import express from 'express';
import { addComment } from '../controller/comment.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/:templateId/add-comment',verifyToken, addComment);

export default router;