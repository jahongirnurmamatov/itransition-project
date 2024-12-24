import prisma from "../db/prisma.js";

export const userRoleChange = async (req, res) => {  
    try {
        const { userId, role } = req.body;
                
        const user = await prisma.user.update({
            where: { id: userId },
            data: { role },
        });
        res.status(200).json({ success: true, message: "User role changed successfully.",user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}