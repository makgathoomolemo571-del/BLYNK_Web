import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../modules/auth/store/authSlice";
import userReducer from "../modules/user/store/userSlice";
import postReducer from "../modules/post/store/postSlice"
import reelReducer from "../modules/reel/store/reelSlice";
import storyReducer from "../modules/story/store/storySlice";
import notificationReducer from "../modules/notification/store/notificationSlice";
import podcastReducer from "../modules/podcast/store/podcastSlice";
import creatorHireReducer from "../modules/creatorHire/store/creatorHireSlice";
import supportReducer from "../modules/support/store/supportSlice";
import profileReducer from "../modules/profile/store/profileSlice";
import socialReducer from "../modules/social/store/socialSlice";
import monetizationReducer from "../modules/monetization/store/monetizationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    profile: profileReducer,
    reel: reelReducer,
    story: storyReducer,
    notification: notificationReducer,
    podcast: podcastReducer,
    creatorHire: creatorHireReducer,
    support: supportReducer,
    social: socialReducer,
    monetization: monetizationReducer,
  },
});

export default store;