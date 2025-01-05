import express from 'express';
import { createTemplate, deleteManyTemplates, getPopularTemplates, getTemplateById, getTemplates, likeUnlike, updateTemplate } from '../controller/template.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();

router.post('/create', verifyToken,createTemplate);
router.put('/update/:id', verifyToken,updateTemplate);
router.get('/get-templates',getTemplates);
router.get('/popular',getPopularTemplates);
router.get('/:id',  getTemplateById);
router.delete('/delete-templates',verifyToken, verifyAdmin, deleteManyTemplates);
router.post('/:id/like-unlike', verifyToken, likeUnlike);

export default router;