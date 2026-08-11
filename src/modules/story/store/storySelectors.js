export const selectStories = (state) => state.story?.stories || [];

export const selectActiveStories = (state) =>
  (state.story?.stories || []).filter(
    (story) =>
      !story.isDeleted &&
      new Date(story.expiresAt) > new Date()
  );

export const selectStoryById = (id) => (state) =>
  state.story?.stories?.find((story) => story.id === id);

export const selectStoryLoading = (state) =>
  state.story?.loading || false;

export const selectStoryError = (state) =>
  state.story?.error || null;

export const selectStoryFeed = (state) =>
  state.story?.feed || [];

export const selectStoryViews = (state) =>
  state.story?.views || {};

export const selectHasViewedStory = (storyId, userId) => (state) => {
  const story = state.story?.stories?.find(
    (s) => s.id === storyId
  );

  

  if (!story || !story.viewers) return false;

  return story.viewers.includes(userId);
};