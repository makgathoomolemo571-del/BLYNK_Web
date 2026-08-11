export const AnalyticsDTO = (data) => {
  return {
    users: {
      total: data?.users?.total,
      active: data?.users?.active,
      new: data?.users?.new
    },

    content: {
      posts: data?.content?.posts,
      reels: data?.content?.reels,
      stories: data?.content?.stories
    },

    engagement: {
      likes: data?.engagement?.likes,
      comments: data?.engagement?.comments,
      shares: data?.engagement?.shares,
      views: data?.engagement?.views
    },

    revenue: {
      total: data?.revenue?.total,
      monthly: data?.revenue?.monthly
    },

    system: {
      uptime: data?.system?.uptime,
      errors: data?.system?.errors
    }
  };
};
