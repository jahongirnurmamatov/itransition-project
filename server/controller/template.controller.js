import prisma from "../db/prisma.js";

export const createTemplate = async (req, res) => {
  try {
    const {
      title,
      topic,
      description,
      imageUrl,
      forms,
      tags,
      sharedWith,
      visibility,
    } = req.body;

    const sharedWithData =
      visibility.toUpperCase() === "PRIVATE" && sharedWith?.length
        ? {
            create: sharedWith.map((user) => ({
              userId: user.id,
            })),
          }
        : undefined;

    const template = await prisma.template.create({
      data: {
        title,
        topic,
        description,
        imageUrl,
        visibility: visibility.toUpperCase(),
        sharedWith: sharedWithData,
        userId: req.userId,
        questions: {
          create: forms.map((form, index) => ({
            type: form.type,
            label: form.label,
            description: form.description,
            required: form.required,
            orderIndex: index,
            options: form.options.length
              ? {
                  create: form.options.map((option) => ({
                    value: option,
                  })),
                }
              : undefined,
          })),
        },
        tags: {
          create: tags.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: { name: tag.value },
                create: { name: tag.value },
              },
            },
          })),
        },
      },
    });

    res.status(201).json({ success: true, template });
  } catch (error) {
    console.error("Error creating template:", error);
    res
      .status(500)
      .json({ success: false, message: "Error creating template" });
  }
};

export const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await prisma.template.findUnique({
      where: { id: parseInt(id) },
      include: {
        questions: {
          include: { options: true },
        },
        likes: {
          select: {
            userId: true,
            user: { select: { username: true } },
          },
        },
        user: {
          select: {
            username: true,
            id: true,
            avatar: true,
          },
        },
        tags: {
          include: {
            tag: {
              select: { name: true },
            },
          },
        },
      },
    });

    if (!template) {
      return res
        .status(404)
        .json({ success: false, message: "Template not found." });
    }

    res.status(200).json({
      success: true,
      template,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteManyTemplates = async (req, res) => {
  try {
    const { templateIds } = req.body;

    if (!Array.isArray(templateIds) || templateIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "templateIds must be a non-empty array.",
      });
    }

    const result = await prisma.template.deleteMany({
      where: {
        id: {
          in: templateIds,
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: `${result.count} template(s) have been deleted successfully.`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getTemplates = async (req, res) => {
  try {
    const {
      userId = null,
      searchKey = "",
      titleOrder,
      topicOrder,
      createdAtOrder = "desc",
      tags = "",
      page = 1,
      limit = 5,
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      AND: [
        {
          OR: [
            { title: { contains: searchKey, mode: "insensitive" } },
            { topic: { contains: searchKey, mode: "insensitive" } },
          ],
        },
      ],
    };

    if (userId) {
      where.AND.push({ userId: parseInt(userId) });
    }

    if (tags) {
      const tagArray = tags.split(",");
      where.AND.push({
        tags: {
          some: {
            tag: {
              name: { in: tagArray },
            },
          },
        },
      });
    }

    const orderBy = [];
    if (titleOrder) orderBy.push({ title: titleOrder });
    if (topicOrder) orderBy.push({ topic: topicOrder });
    if (createdAtOrder) orderBy.push({ createdAt: createdAtOrder });

    const templates = await prisma.template.findMany({
      select: {
        id: true,
        title: true,
        topic: true,
        description: true,
        imageUrl: true,
        user: {
          select: {
            username: true,
            id: true,
          },
        },
        visibility: true,
        sharedWith: {
          select: {
            userId: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        tags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      where,
      orderBy,
      skip,
      take: parseInt(limit),
    });

    const totalTemplates = await prisma.template.count({ where });

    res.status(200).json({
      success: true,
      templates,
      totalPages: Math.ceil(totalTemplates / parseInt(limit)),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const likeUnlike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    console.log(id);
    const template = await prisma.template.findUnique({
      where: { id: parseInt(id) },
      include: { likes: true },
    });

    if (!template) {
      return res
        .status(404)
        .json({ success: false, message: "Template not found." });
    }

    const isLiked = template.likes.some((like) => like.userId === userId);

    if (isLiked) {
      await prisma.like.delete({
        where: {
          userId_templateId: {
            userId,
            templateId: parseInt(id),
          },
        },
      });
    } else {
      await prisma.like.create({
        data: {
          userId,
          templateId: parseInt(id),
        },
      });
    }

    const updatedTemplate = await prisma.template.findUnique({
      where: { id: parseInt(id) },
      include: {
        likes: {
          select: {
            userId: true,
            user: { select: { username: true } },
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      template: updatedTemplate,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPopularTemplates = async (req, res) => {
  try {
    const templates = await prisma.template.findMany({
      include: {
        _count: {
          select: { responses: true }, // Count responses associated with each template
        },
      },
      orderBy: {
        responses: {
          _count: "desc", // Order by response count in descending order
        },
      },
      take: 5,
    });

    res.status(200).json({ templates });
  } catch (error) {
    console.error("Error fetching popular templates:", error);
    res.status(500).json({ error: "Error fetching popular templates." });
  }
};
export const getRecentTemplates = async (req, res) => {
  try {
    const templates = await prisma.template.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    res.status(200).json({ success: true, templates });
  } catch (error) {
    console.error("Error fetching recent templates:", error);
    res.status(500).json({ error: "Error fetching recent templates." });
  }
};

export const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, topic, description, imageUrl, forms, tags, sharedWith, visibility } = req.body;

    const sharedWithData =
      visibility.toUpperCase() === 'PRIVATE' && sharedWith?.length
        ? {
            connectOrCreate: sharedWith.map((user) => ({
              where: { userId_templateId: { userId: user.id, templateId: parseInt(id) } },
              create: { userId: user.id, templateId: parseInt(id) },
            })),
          }
        : { connectOrCreate: [] };

    // Update the template
    const updatedTemplate = await prisma.template.update({
      where: { id: parseInt(id) },
      data: {
        title,
        topic,
        description,
        imageUrl,
        visibility: visibility.toUpperCase(),
        sharedWith: sharedWithData, // Use correct relationship handling here
        tags: {
          deleteMany: {}, // Clear existing tags
          create: tags.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: { name: tag.value },
                create: { name: tag.value },
              },
            },
          })),
        },
      },
    });

    // Update questions
    for (const [index, form] of forms.entries()) {
      if (!form.isNew) {
        // Update existing question
        await prisma.question.update({
          where: { id: parseInt(form.id) },
          data: {
            type: form.type,
            label: form.label,
            description: form.description,
            required: form.required,
            orderIndex: index,
            options: {
              deleteMany: {}, // Clear existing options
              create: form.options.map((option) => ({ value: option })), // Add new options
            },
          },
        });
      } else {
        // Create new question
        await prisma.question.create({
          data: {
            type: form.type,
            label: form.label,
            description: form.description,
            required: form.required,
            orderIndex: index,
            options: {
              create: form.options.map((option) => ({ value: option })),
            },
            templateId: parseInt(id),
          },
        });
      }
    }

    res.status(200).json({ success: true, template: updatedTemplate });
  } catch (error) {
    console.error('Error updating template:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating template',
      error: error.message,
    });
  }
};