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
    console.error('Error creating template:', error.message);
    res.status(500).json({ success: false, message: 'Error creating template' });
  }
};
