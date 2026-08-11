export const SearchDTO = (data) => {
  return {
    users: (data?.users || []).map(user => ({
      id: user?._id,
      username: user?.username,
      profilePicture: user?.profilePicture
    })),

    posts: (data?.posts || []).map(post => ({
      id: post?._id,
      caption: post?.caption,
      media: post?.media
    })),

    reels: (data?.reels || []).map(reel => ({
      id: reel?._id,
      video: reel?.video,
      caption: reel?.caption
    })),

    podcasts: (data?.podcasts || []).map(podcast => ({
      id: podcast?._id,
      title: podcast?.title
    })),

    businesses: (data?.businesses || []).map(business => ({
      id: business?._id,
      name: business?.name
    }))
  };
};