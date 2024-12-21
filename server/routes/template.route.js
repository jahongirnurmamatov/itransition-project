import express from 'express';
import { createTemplate, deleteTemplate } from '../controller/template.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/create', verifyToken,createTemplate);
router.delete('/:id', verifyToken, deleteTemplate);

export default router;