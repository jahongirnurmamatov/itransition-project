import express from 'express';
import { createTemplate, deleteTemplate, getTemplateById } from '../controller/template.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/create', verifyToken,createTemplate);
router.get('/:id',  getTemplateById);
router.delete('/:id', verifyToken, deleteTemplate);

export default router;