import express from 'express';
import { createTemplate, deleteTemplate, getMyTemplates, getPopularTemplates, getTemplateById, likeUnlike } from '../controller/template.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/create', verifyToken,createTemplate);
router.get('/get-my-templates', verifyToken,getMyTemplates);
router.get('/popular',getPopularTemplates);
router.get('/:id',  getTemplateById);
router.delete('/:id', verifyToken, deleteTemplate);
router.post('/:id/like-unlike', verifyToken, likeUnlike);

export default router;