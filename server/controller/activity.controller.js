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
        type: 'Created Template',
        time: template.createdAt,
        details: {
          title: template.title,
          user: template.user.username,
        },
      })),
      ...comments.map((comment) => ({
        type: 'Commented',
        time: comment.createdAt,
        details: {
          content: comment.content,
          user: comment.user.username,
          template: comment.template.title,
        },
      })),
      ...likes.map((like) => ({
        type: 'Liked Template',
        time: like.template.createdAt,
        details: {
          user: like.user.username,
          template: like.template.title,
        },
      })),
      ...responses.map((response) => ({
        type: 'Response',
        time: response.createdAt,
        details: {
          user: response.user.username,
          template: response.template.title,
        },
      })),
    ];

    activities.sort((a, b) => new Date(b.time) - new Date(a.time));

    const recentActivities = activities.slice(0, 4);

    res.status(200).json({
      success: true,
      data: recentActivities,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
