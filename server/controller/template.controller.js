import prisma from "../db/prisma.js";


export const createTemplate = async (req, res) => {
  try {
    const { title, topic, description, imageUrl, forms, tags } = req.body;

    const template = await prisma.template.create({
      data: {
        title,
        topic,
        description,
        imageUrl,
        tags,
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
export const getTemplateById = async(req,res)=>{
  try {
    const { id } = req.params; 
    const template = await prisma.template.findUnique({
      where: { id: parseInt(id) },
      include: { questions: {
        include: { options: true }
      } }, 
    });
    res.status(200).json({
      success: true,
      template
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
}

export const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params; 
    const userId = req.userId; 

    const template = await prisma.template.findUnique({
      where: { id: parseInt(id) },
      include: { questions: true }, 
    });

    if (!template) {
      return res.status(404).json({success:false, message:'Template not found.'});
    }

    if (template.userId !== userId) {
      return res.status(404).json({success:false, message:"Forbidden - You don't have permission to delete this template."});
    }

    await prisma.template.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      message: 'Template deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyTemplates = async (req, res) => {
  try {
    const userId = req.userId;
    const templates = await prisma.template.findMany({
      where: { userId },
      select: {
        id: true,
        title: true, 
        topic: true, 
        description: true, 
        imageUrl: true, 
        createdAt: true, 
        updatedAt: true, 
      },
    });
    res.status(200).json({
      success: true,
      templates,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
