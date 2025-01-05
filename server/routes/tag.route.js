import express from 'express';
import prisma from '../db/prisma.js';

const router = express.Router();

router.get('/get-tags', async(req, res) => {
    try {
        const tags = await prisma.tag.findMany();
        res.json({success: true, tags});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }   
})

export default router;