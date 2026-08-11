// src/modules/episode/store/episodeSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import episodeApi from "../services/episode.api";

/*
|--------------------------------------------------------------------------
| THUNKS
|--------------------------------------------------------------------------
*/

export const createEpisode = createAsyncThunk(
    "episode/create",

    async (data, { rejectWithValue }) => {

        try {

            return await episodeApi.create(data);

        } catch (err) {

            return rejectWithValue(
                err.response?.data?.message ||
                "Failed to create episode."
            );

        }

    }
);

export const fetchEpisode = createAsyncThunk(
    "episode/getById",

    async (id, { rejectWithValue }) => {

        try {

            return await episodeApi.getById(id);

        } catch (err) {

            return rejectWithValue(
                err.response?.data?.message ||
                "Failed to load episode."
            );

        }

    }
);

export const updateEpisode = createAsyncThunk(
    "episode/update",

    async ({ id, data }, { rejectWithValue }) => {

        try {

            return await episodeApi.update(id, data);

        } catch (err) {

            return rejectWithValue(
                err.response?.data?.message ||
                "Failed to update episode."
            );

        }

    }
);

export const deleteEpisode = createAsyncThunk(
    "episode/delete",

    async (id, { rejectWithValue }) => {

        try {

            await episodeApi.delete(id);

            return id;

        } catch (err) {

            return rejectWithValue(
                err.response?.data?.message ||
                "Failed to delete episode."
            );

        }

    }
);

export const playEpisode = createAsyncThunk(
    "episode/play",

    async (id) => {

        await episodeApi.play(id);

        return id;

    }
);

export const viewEpisode = createAsyncThunk(
    "episode/view",

    async (id) => {

        await episodeApi.view(id);

        return id;

    }
);

export const likeEpisode = createAsyncThunk(
    "episode/like",

    async (id) => {

        await episodeApi.like(id);

        return id;

    }
);

export const shareEpisode = createAsyncThunk(
    "episode/share",

    async (id) => {

        await episodeApi.share(id);

        return id;

    }
);

/*
|--------------------------------------------------------------------------
| STATE
|--------------------------------------------------------------------------
*/

const initialState = {

    episodes: [],

    selectedEpisode: null,

    loading: false,

    error: null

};

/*
|--------------------------------------------------------------------------
| SLICE
|--------------------------------------------------------------------------
*/

const episodeSlice = createSlice({

    name: "episode",

    initialState,

    reducers: {

        clearEpisode(state) {

            state.selectedEpisode = null;

        },

        clearEpisodeError(state) {

            state.error = null;

        }

    },

    extraReducers: (builder) => {

        builder

            /* CREATE */

            .addCase(createEpisode.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(createEpisode.fulfilled, (state, action) => {

                state.loading = false;

                state.episodes.unshift(action.payload);

            })

            .addCase(createEpisode.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

            /* GET */

            .addCase(fetchEpisode.pending, (state) => {

                state.loading = true;

            })

            .addCase(fetchEpisode.fulfilled, (state, action) => {

                state.loading = false;

                state.selectedEpisode = action.payload;

            })

            .addCase(fetchEpisode.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

            /* UPDATE */

            .addCase(updateEpisode.fulfilled, (state, action) => {

                state.selectedEpisode = action.payload;

                state.episodes = state.episodes.map(

                    episode =>

                        episode.id === action.payload.id

                            ? action.payload

                            : episode

                );

            })

            /* DELETE */

            .addCase(deleteEpisode.fulfilled, (state, action) => {

                state.episodes =

                    state.episodes.filter(

                        episode =>

                            episode.id !== action.payload

                    );

                if (

                    state.selectedEpisode?.id ===

                    action.payload

                ) {

                    state.selectedEpisode = null;

                }

            })

            /* PLAY */

            .addCase(playEpisode.fulfilled, (state) => {

                if (state.selectedEpisode) {

                    state.selectedEpisode.plays++;

                }

            })

            /* VIEW */

            .addCase(viewEpisode.fulfilled, (state) => {

                if (state.selectedEpisode) {

                    state.selectedEpisode.views++;

                }

            })

            /* LIKE */

            .addCase(likeEpisode.fulfilled, (state) => {

                if (state.selectedEpisode) {

                    state.selectedEpisode.likes =
                        (state.selectedEpisode.likes || 0) + 1;

                }

            })

            /* SHARE */

            .addCase(shareEpisode.fulfilled, (state) => {

                if (state.selectedEpisode) {

                    state.selectedEpisode.shares++;

                }

            });

    }

});

export const {

    clearEpisode,

    clearEpisodeError

} = episodeSlice.actions;

export default episodeSlice.reducer;