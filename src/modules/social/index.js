// modules/social/index.js

import SOCIAL from "./constants/social.constants";

import FriendCard from "./components/FriendCard";
import FriendRequestCard from "./components/FriendRequestCard";
import FollowerCard from "./components/FollowerCard";
import FollowingCard from "./components/FollowingCard";
import SuggestionCard from "./components/SuggestionCard";
import MutualFriends from "./components/MutualFriends";

import FriendsPage from "./pages/FriendsPage";
import FollowersPage from "./pages/FollowersPage";
import FollowingPage from "./pages/FollowingPage";
import FriendRequestsPage from "./pages/FriendRequestsPage";
import SuggestionsPage from "./pages/SuggestionsPage";
import BlockedUsersPage from "./pages/BlockedUsersPage";

import socialApi from "./services/social.api";

import useFriends from "./hooks/useFriends";
import useFollowers from "./hooks/useFollowers";
import useFollowing from "./hooks/useFollowing";
import useFriendRequests from "./hooks/useFriendRequests";
import useSuggestions from "./hooks/useSuggestions";

import socialSlice from "./store/socialSlice";
import * as socialSelectors from "./store/socialSelectors";
import * as socialActions from "./store/socialActions";

import routes from "./routes/social.routes";

import friendValidator from "./validators/friend.validator";
import followValidator from "./validators/follow.validator";

import FriendDTO from "./dto/friend.dto";
import FollowerDTO from "./dto/follower.dto";

export {

  SOCIAL,

  socialApi,

  socialSlice,

  socialSelectors,

  socialActions,

  routes,

  friendValidator,

  followValidator,

  FriendDTO,

  FollowerDTO,

  useFriends,

  useFollowers,

  useFollowing,

  useFriendRequests,

  useSuggestions,

  FriendCard,

  FriendRequestCard,

  FollowerCard,

  FollowingCard,

  SuggestionCard,

  MutualFriends,

  FriendsPage,

  FollowersPage,

  FollowingPage,

  FriendRequestsPage,

  SuggestionsPage,

  BlockedUsersPage

};

export default {

  SOCIAL,

  socialApi,

  socialSlice,

  socialSelectors,

  socialActions,

  routes

};