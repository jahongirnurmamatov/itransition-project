import prisma from "../db/prisma.js";

export const verifyAdmin = async(req, res, next) => {  
    try {
        const   currentUser = await prisma.user.findUnique({ where: { id: req.userId } });
        if (currentUser.role.toUpperCase() !== "ADMIN") {
            return res.status(403).json({ success: false, message: "Unauthorized, you are not an admin" });
        }

        next();
    } catch (error) {
       res.status(500).json({ success: false, message: error.message }); 
    }
}