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
      },
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
