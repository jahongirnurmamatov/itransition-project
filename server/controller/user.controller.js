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
            limit = 5,
        } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

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
                status:true,
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

export const searchUsers = async (req, res) => {
    const {query} = req.query;
  if (!query || query.length < 2) {
        return res.json([]);
    }
  try {
    const users = await prisma.$queryRaw`
    SELECT id, username, email
    FROM "User"
    WHERE username ILIKE '%' || ${query} || '%' OR email ILIKE '%' || ${query} || '%'
    ORDER BY similarity(username, ${query}) DESC, similarity(email, ${query}) DESC
    LIMIT 10;
  `;
   res.status(200).json({users})
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
}
export const deleteUsers = async (req, res) => {
  try {
    const { userIds } = req.body;

    await prisma.user.deleteMany({
      where: { id: { in: userIds } },
    });

    res
      .status(200)
      .json({ success: true, message: "Users deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const blockUsers = async(req,res)=>{
    try {
        const {userIds} = req.body;
        await prisma.user.updateMany({
            where: { id: { in: userIds } },
            data: { status: "BLOCKED" },
        });
        res.status(200).json({ success: true, message: "Users blocked successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export const unBlockUsers = async(req,res)=>{
    try {
        const {userIds} = req.body;
        await prisma.user.updateMany({
            where: { id: { in: userIds } },
            data: { status: "ACTIVE" },
        });
        res.status(200).json({ success: true, message: "Users blocked successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        select: {
          email: true,
          username: true,
          role: true,
          status: true,
          avatar: true,
          createdAt: true,
          templates: {
            select: {
              id: true,
              title: true,
              description: true,
              createdAt: true,
              responses: {
                select: {
                  id: true,
                },
              }
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 4,
          },
        },
      });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const [templateCount, responseCount, commentCount] = await Promise.all([
        prisma.template.count({ where: { userId: parseInt(userId) } }),
        prisma.response.count({ where: { userId: parseInt(userId) } }),
        prisma.comment.count({ where: { userId: parseInt(userId) } }),
      ]);
  
      const userWithCounts = {
        ...user,
        counts: {
          templates: templateCount,
          responses: responseCount,
          comments: commentCount,
        },
      };
  
      res.status(200).json({ success: true, user: userWithCounts });
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: error.message });
    }
  };
  