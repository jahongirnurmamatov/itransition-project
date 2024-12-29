import express from 'express';
import { createTemplate, deleteManyTemplates, getMyTemplates, getPopularTemplates, getTemplateById, likeUnlike } from '../controller/template.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();

router.post('/create', verifyToken,createTemplate);
router.get('/get-my-templates', verifyToken,getMyTemplates);
router.get('/popular',getPopularTemplates);
router.get('/:id',  getTemplateById);
router.delete('/delete-templates', verifyAdmin, deleteManyTemplates);
router.post('/:id/like-unlike', verifyToken, likeUnlike);

export default router;