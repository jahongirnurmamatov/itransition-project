import prisma from "../db/prisma.js";

export const userRoleChange = async (req, res) => {  
    try {
        const { userId, role } = req.body;
        const user = await prisma.user.update({
            where: { id: userId },
            data: { role:role.toUpperCase() },
        });
        res.status(200).json({ success: true, message: "User role changed successfully.",user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany(
           {
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                avatar: true,
                createdAt: true,
            },
            where: {
                id: {
                    not: req.userId,
                },
            },
            orderBy: {
                createdAt: "desc",
            },
           },
           
        );
        res.status(200).json({ false: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}