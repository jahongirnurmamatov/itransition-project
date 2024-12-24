import prisma from "../db/prisma.js";

export const verifyAdmin = async(req, res, next) => {  
    try {
        // Check if the user is an admin
        const   currentUser = await prisma.user.findUnique({ where: { id: req.userId } });
        console.log(currentUser.role.toUpperCase())
        if (currentUser.role.toUpperCase() !== "ADMIN") {
            return res.status(403).json({ success: false, message: "Unauthorized, you are not an admin" });
        }

        next();
    } catch (error) {
       res.status(500).json({ success: false, message: error.message }); 
    }
}