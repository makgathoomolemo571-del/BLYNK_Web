import { createAction } from "@reduxjs/toolkit";

// =======================
// STORY LIFECYCLE ACTIONS
// =======================

export const storyCreated = createAction(
  "story/storyCreated"
);

export const storyFetched = createAction(
  "story/storyFetched"
);

export const storyFeedLoaded = createAction(
  "story/storyFeedLoaded"
);

export const storyViewed = createAction(
  "story/storyViewed"
);

export const storyReacted = createAction(
  "story/storyReacted"
);

export const storyReplied = createAction(
  "story/storyReplied"
);

export const storyDeleted = createAction(
  "story/storyDeleted"
);

export const storyExpired = createAction(
  "story/storyExpired"
);

// =======================
// REALTIME / SOCKET EVENTS
// =======================

export const storySocketNew = createAction(
  "story/socketNew"
);

export const storySocketUpdate = createAction(
  "story/socketUpdate"
);

export const storySocketDelete = createAction(
  "story/socketDelete"
);

// =======================
// FEED CONTROL
// =======================

export const storyFeedRefresh = createAction(
  "story/feedRefresh"
);

export const storyFeedReset = createAction(
  "story/feedReset"
);