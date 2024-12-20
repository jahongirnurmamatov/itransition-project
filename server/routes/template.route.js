import express from 'express';
import { createTemplate } from '../controller/template.controller.js';

const router = express.Router();

router.post('/create', createTemplate);

export default router;