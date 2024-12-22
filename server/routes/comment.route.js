import express from 'express';
import { addComment, getComments } from '../controller/comment.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/:templateId/add-comment',verifyToken, addComment);
router.get('/:templateId/get-comments', getComments);

export default router;