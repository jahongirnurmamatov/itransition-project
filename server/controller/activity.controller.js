import prisma from "../db/prisma.js";

export const getRecentActivities = async (req, res) => {
  try {
    const { userId } = req.params;

    const templates = await prisma.template.findMany({
      where: { userId: parseInt(userId) },
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    });

    const comments = await prisma.comment.findMany({
      where: { userId: parseInt(userId) },
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: { user: true, template: true },
    });

    const likes = await prisma.like.findMany({
      where: { userId: parseInt(userId) },
      take: 4,
      orderBy: { id: 'desc' },
      include: { user: true, template: true },
    });

    const responses = await prisma.response.findMany({
      where: { userId: parseInt(userId) },
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: { user: true, template: true },
    });

    const activities = [
      ...templates.map((template) => ({
        type: 'Create',
        time: template.createdAt,
        description:`${template.user.username} created ${template.title}.`,
      })),
      ...comments.map((comment) => ({
        type: 'Comment',
        time: comment.createdAt,
        description: `${comment.user.username} commented: ${comment.content}.`,
      })),
      ...likes.map((like) => ({
        type: 'Like',
        time: like.template.createdAt,
        description:  `${like.user.username} liked ${like.template.title} template.`,
      })),
      ...responses.map((response) => ({
        type: 'Response',
        time: response.createdAt,
        description: `${response.user.username} responded to ${response.template.title}.`,
      })),
    ];

    activities.sort((a, b) => new Date(b.time) - new Date(a.time));

    const recentActivities = activities.slice(0, 4);

    res.status(200).json({
      success: true,
      activities: recentActivities,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
