import express from 'express';
import { addResponse, getAggregates, getMyResponse, getResponders } from '../controller/response.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { get } from 'mongoose';

const router = express.Router();

router.post('/:templateId/submit',verifyToken, addResponse);
router.get('/:templateId/get-responders', getResponders);
router.get('/:templateId/get-aggregates', getAggregates);
router.get('/:templateId/my-response',verifyToken, getMyResponse);

export default router;