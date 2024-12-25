import express from 'express';
import { addResponse, getResponses } from '../controller/response.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/:templateId/submit',verifyToken, addResponse);
router.get('/:templateId/get-responses', getResponses);

export default router;