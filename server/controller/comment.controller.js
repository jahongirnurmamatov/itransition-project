import prisma from "../db/prisma.js";

export const addComment = async (req, res) => {
  try {
    const { content } = req.body; 
    const { templateId } = req.params;
    const userId = req.userId;

    if (!content || content.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Comment content cannot be empty.",
      });
    }

    const template = await prisma.template.findUnique({
      where: { id: parseInt(templateId) },
    });
    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found.",
      });
    }

    const newComment = await prisma.comment.create({
      data: {
        userId,
        templateId: parseInt(templateId),
        content,
      },include: {
        user: { 
          select: { 
            id: true,
            username: true, 
            avatar: true 
          } 
        },
      }
    });

    res.status(200).json({
      success: true,
      message: "Comment added successfully.",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getComments = async(req,res)=>{
    try {
        const { templateId } = req.params;
        const comments = await prisma.comment.findMany({
            where: { templateId: parseInt(templateId) },
            include: {
              user: { 
                select: { 
                  username: true, 
                  id: true, 
                  avatar: true 
                } 
              }, 
            },
            orderBy: { createdAt: "desc" },
          })
        res.status(200).json({
            success: true,
            comments
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteComment = async(req,res)=>{
    try {
        const { commentId } = req.params;
        await prisma.comment.delete({
            where: { id: parseInt(commentId) },
        });
        res.status(200).json({ success: true, message: "Comment deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const editComment= async(req,res)=>{
    try {
        const {commentId} = req.params;
        const {content} = req.body;
        const updatedComment = await prisma.comment.update({
            where: { id: parseInt(commentId) },
            data: { content },
            include:{
                user: { 
                    select: { 
                      id: true,
                      username: true, 
                      avatar: true 
                    } 
                  }, 
            }
        });
        res.status(200).json({ success: true, message: "Comment updated successfully.",comment: updatedComment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}