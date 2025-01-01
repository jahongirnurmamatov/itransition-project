import express from 'express';
import { createTemplate, deleteManyTemplates, getPopularTemplates, getTemplateById, getTemplates, likeUnlike } from '../controller/template.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();

router.post('/create', verifyToken,createTemplate);
router.get('/get-templates', verifyToken,getTemplates);
router.get('/popular',getPopularTemplates);
router.get('/:id',  getTemplateById);
router.delete('/delete-templates',verifyToken, verifyAdmin, deleteManyTemplates);
router.post('/:id/like-unlike', verifyToken, likeUnlike);

export default router;