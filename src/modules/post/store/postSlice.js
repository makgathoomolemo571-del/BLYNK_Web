import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postApi from "../services/post.api";

export const fetchFeed = createAsyncThunk(
  "post/fetchFeed",
  async (_, { rejectWithValue }) => {
    try {
      return await postApi.getFeed();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load feed"
      );
    }
  }
);

export const likePost=createAsyncThunk(
"post/like",
async(id)=>{

await postApi.like(id);

return id;

});

export const unlikePost=createAsyncThunk(
"post/unlike",
async(id)=>{

await postApi.unlike(id);

return id;

});

export const sharePost=createAsyncThunk(
"post/share",
async(id)=>{

await postApi.share(id);

return id;

});

export const deletePostAsync=createAsyncThunk(

"post/delete",

async(id)=>{

await postApi.delete(id);

return id;

}

);

export const fetchPost=createAsyncThunk(
"post/getOne",
async(id)=>{

return await postApi.getById(id);

});

const initialState = {
  posts: [],
  feed: [],
  selectedPost: null,
  loading: false,
  error: null,
  hasMore: true,
  page: 1
};

const postSlice = createSlice({
  name: "post",
  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    appendPosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },

    setFeed: (state, action) => {
      state.feed = action.payload;
    },

    appendFeed: (state, action) => {
      state.feed = [...state.feed, ...action.payload];
    },

    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },

    addPost: (state, action) => {
      state.posts.unshift(action.payload);
      state.feed.unshift(action.payload);
    },

    updatePost: (state, action) => {
      const index = state.posts.findIndex(
        (p) => p.id === action.payload.id
      );

      if (index !== -1) {
        state.posts[index] = action.payload;
      }

      const feedIndex = state.feed.findIndex(
        (p) => p.id === action.payload.id
      );

      if (feedIndex !== -1) {
        state.feed[feedIndex] = action.payload;
      }
    },

    removePostFromState:(state,action)=>{

state.posts=
state.posts.filter(
p=>p.id!==action.payload
);

state.feed=
state.feed.filter(
p=>p.id!==action.payload
);



},

    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    resetPosts: (state) => {
      state.posts = [];
      state.feed = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    }
  },

  // ✅ CORRECT PLACE
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      })

      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(likePost.fulfilled,(state,action)=>{

const post=state.feed.find(
p=>p.id===action.payload
);

if(post){

post.stats.likes++;

post.liked=true;

}

})

.addCase(unlikePost.fulfilled,(state,action)=>{

const post=state.feed.find(
p=>p.id===action.payload
);

if(post){

post.stats.likes--;

post.liked=false;

}

})

.addCase(deletePostAsync.fulfilled,(state,action)=>{

state.feed=
state.feed.filter(
p=>p.id!==action.payload
);

state.posts=
state.posts.filter(
p=>p.id!==action.payload
);


})

.addCase(sharePost.fulfilled,(state,action)=>{

const post=
state.feed.find(
p=>p.id===action.payload
);

if(post){

post.stats.shares++;

}

});


  }
  
});

export const {
  setLoading,
  setError,
  setPosts,
  appendPosts,
  setFeed,
  appendFeed,
  setSelectedPost,
  addPost,
  updatePost,
  removePostFromState,
  setHasMore,
  setPage,
  resetPosts
} = postSlice.actions;

export default postSlice.reducer;