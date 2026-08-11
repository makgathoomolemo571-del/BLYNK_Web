import UserAvatar from "./components/UserAvatar";
import UserCard from "./components/UserCard";
import UserStats from "./components/UserStats";
import UserHeader from "./components/UserHeader";
import UserBadge from "./components/UserBadge";

import UserProfile from "./pages/UserProfile";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import SavedPosts from "./pages/SavedPosts";

import * as userService from "./services/user.service";
import * as userApi from "./services/user.api";

import useUser from "./hooks/useUser";
import useFollowers from "./hooks/useFollowers";
import useFollowing from "./hooks/useFollowing";

import userSlice from "./store/userSlice";
import * as userSelectors from "./store/userSelectors";
import * as userActions from "./store/userActions";

import userRoutes from "./routes/user.routes";

import updateProfileValidator from "./validators/updateProfile.validator";

import UserDTO from "./dto/UserDTO";
import UserProfileDTO from "./dto/UserProfileDTO";

import * as userConstants from "./constants/user.constants";
import * as userTypes from "./types/user.types";

/**
 * USER MODULE ENTRY
 * Production aggregator for all user features
 */

const UserModule = {
  components: {
    UserAvatar,
    UserCard,
    UserStats,
    UserHeader,
    UserBadge
  },

  pages: {
    UserProfile,
    Followers,
    Following,
    SavedPosts
  },

  services: {
    ...userService,
    ...userApi
  },

  hooks: {
    useUser,
    useFollowers,
    useFollowing
  },

  store: {
    slice: userSlice,
    selectors: userSelectors,
    actions: userActions
  },

  routes: userRoutes,

  validators: {
    updateProfile: updateProfileValidator
  },

  dto: {
    UserDTO,
    UserProfileDTO
  },

  constants: userConstants,
  types: userTypes
};

export default UserModule;