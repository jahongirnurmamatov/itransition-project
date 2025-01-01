import prisma from "../db/prisma.js";


export const createTemplate = async (req, res) => {
  try {
    const { title, topic, description, imageUrl, forms, tags,sharedWith, visibility } = req.body;

    const sharedWithData = 
      visibility.toUpperCase() === 'PRIVATE' && sharedWith?.length
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
        tags,
        visibility:visibility.toUpperCase(),
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
                  create: form.options.map(option => ({
                    value: option, 
                  })),  
                }
              : undefined,
          })),
        },
      },
    });

    res.status(201).json({ success: true, template });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating template' });
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
            id:true,
            avatar: true,
          },
        },
      },
    });

    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found.' });
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
        message: 'templateIds must be a non-empty array.',
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
      userId =null,
      searchKey = "",
      titleOrder,
      topicOrder,
      createdAtOrder,
      page = 1,
      limit = 5,
  } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      AND: [
        {
            OR: [
                { title: { contains: searchKey, mode: 'insensitive' } },
                { topic: { contains: searchKey, mode: 'insensitive' } },
            ],
        },
        
    ],
  };
  if(userId){
    where.AND.push({ userId: parseInt(userId) });
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

export const likeUnlike   = async (req, res) => {
  try {
      const { id } = req.params;
      const userId = req.userId;
      console.log(id)
      const template = await prisma.template.findUnique({
          where: { id: parseInt(id) },
          include: { likes: true },            
      });

      if (!template) {
          return res.status(404).json({success:false, message:'Template not found.'});
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
          include: { likes: {
              select: {
                  userId: true,
                  user: { select: { username: true } },
              },
          } },
      });

      res.status(200).json({
          success: true,
          template: updatedTemplate,
      })
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
}


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
          _count: 'desc', // Order by response count in descending order
        },
      },
      take: 5, 
    });

    res.status(200).json({ templates });
  } catch (error) {
    console.error('Error fetching popular templates:', error);
    res.status(500).json({ error: 'Error fetching popular templates.' });
  }
};

