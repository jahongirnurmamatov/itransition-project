import express from 'express';
import { createTag, getTags, searchTags } from '../controller/tag.controller.js';

const router = express.Router();

router.get('/get-tags', getTags);
router.post('/create-tag', createTag);
router.get('/search-tags', searchTags);


export default router;