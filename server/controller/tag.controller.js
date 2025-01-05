import prisma from "../db/prisma.js";

export const getTags = async(req, res) => {
    try {
        const tags = await prisma.tag.findMany();
        res.json({success: true, tags});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }   
}

export const createTag = async(req, res) => {
    try {
        const {name} = req.body;
        const tag = await prisma.tag.create({data: {name}});
        res.json({success: true, tag});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }   
}
export const searchTags = async(req, res) => {
    try {
        const search = req.query.searchKey || '';
        const tags = await prisma.tag.findMany({
            where: {
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            }
        });
        res.json({
            success: true,
            tags
        });
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}