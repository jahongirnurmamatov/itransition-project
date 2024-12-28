import express from 'express';
import { addResponse, getResponders, getResponses } from '../controller/response.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { get } from 'mongoose';

const router = express.Router();

router.post('/:templateId/submit',verifyToken, addResponse);
router.get('/:templateId/get-responders', getResponders);
router.get('/:templateId/get-responses', getResponses);

export default router;