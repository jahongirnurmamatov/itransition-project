import express from 'express';
import { addResponse, getAggregates, getMyResponse, getMyResponses, getResponders } from '../controller/response.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/:templateId/submit',verifyToken, addResponse);
router.get('/:templateId/get-responders', getResponders);
router.get('/:templateId/get-aggregates', getAggregates);
router.get('/:templateId/my-response',verifyToken, getMyResponse);
router.get('/my-all-responses',verifyToken, getMyResponses);

export default router;