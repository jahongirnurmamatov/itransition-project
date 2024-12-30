import express from 'express';
import { getRecentActivities } from '../controller/activity.controller.js';

const router = express.Router();

router.get('/:userId/get-activity', getRecentActivities);

export default router;