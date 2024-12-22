import express from 'express';
import { addComment, deleteComment, getComments } from '../controller/comment.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/:templateId/add-comment',verifyToken, addComment);
router.get('/:templateId/get-comments', getComments);
router.delete('/:commentId/delete', deleteComment);

export default router;