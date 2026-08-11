import { createSelector } from "@reduxjs/toolkit";

const podcastState = (state) =>
    state.podcast || {};

export const selectPodcasts = createSelector(
    [podcastState],
    (podcast) => podcast.podcasts || []
);

export const selectCurrentPodcast = createSelector(
    [podcastState],
    (podcast) => podcast.currentPodcast
);

export const selectPodcastLoading = createSelector(
    [podcastState],
    (podcast) => podcast.loading
);

export const selectPodcastCreating = createSelector(
    [podcastState],
    (podcast) => podcast.creating
);

export const selectPodcastUpdating = createSelector(
    [podcastState],
    (podcast) => podcast.updating
);

export const selectPodcastDeleting = createSelector(
    [podcastState],
    (podcast) => podcast.deleting
);

export const selectPodcastSubscribed = createSelector(
    [podcastState],
    (podcast) => podcast.subscribed
);

export const selectPodcastError = createSelector(
    [podcastState],
    (podcast) => podcast.error
);

export const selectPodcastById = (id) =>
    createSelector(
        [selectPodcasts],
        (podcasts) =>
            podcasts.find(
                (podcast) => podcast.id === id
            ) || null
    );