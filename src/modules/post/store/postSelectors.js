export const selectPosts = (state) => state.post.posts;

export const selectFeed = (state) => state.post.feed;

export const selectSelectedPost = (state) =>
  state.post.selectedPost;

export const selectPostLoading = (state) =>
  state.post.loading;

export const selectPostError = (state) =>
  state.post.error;

export const selectHasMorePosts = (state) =>
  state.post.hasMore;

export const selectPostPage = (state) =>
  state.post.page;