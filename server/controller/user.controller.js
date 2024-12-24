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
        const {
            searchKey = "",
            usernameOrder,
            emailOrder,
            createdAtOrder,
            page = 1,
            limit = 10,
        } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        console.log(usernameOrder, emailOrder, createdAtOrder, page, limit, searchKey);

        const where = {
            AND: [
                {
                    OR: [
                        { username: { contains: searchKey, mode: 'insensitive' } },
                        { email: { contains: searchKey, mode: 'insensitive' } },
                    ],
                },
                {
                    id: { not: req.userId },
                },
            ],
        };

        const orderBy = [];
        if (usernameOrder) orderBy.push({ username: usernameOrder });
        if (emailOrder) orderBy.push({ email: emailOrder });
        if (createdAtOrder) orderBy.push({ createdAt: createdAtOrder });

        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                avatar: true,
                createdAt: true,
            },
            where,
            orderBy,
            skip,
            take: parseInt(limit),
        });

        const totalUsers = await prisma.user.count({ where });

        res.status(200).json({
            success: true,
            users,
            totalUsers,
            totalPages: Math.ceil(totalUsers / parseInt(limit)),
        });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };