import express from 'express';
import { addResponse } from '../controller/response.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/:templateId/submit',verifyToken, addResponse);

export default router;