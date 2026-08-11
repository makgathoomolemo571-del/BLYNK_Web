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

import * as socialApi from "./services/social.api";

import useFriends from "./hooks/useFriends";
import useFollowers from "./hooks/useFollowers";
import useFollowing from "./hooks/useFollowing";
import useFriendRequests from "./hooks/useFriendRequests";
import useSuggestions from "./hooks/useSuggestions";

import socialSlice from "./store/socialSlice";
import socialSelectors from "./store/socialSelectors";
import socialActions from "./store/socialActions";

import socialRoutes from "./routes/social.routes";

import * as validators from "./validators";
import * as dto from "./dto";
import * as constants from "./constants";

const SocialModule = {
  components: {
    FriendCard,
    FriendRequestCard,
    FollowerCard,
    FollowingCard,
    SuggestionCard,
    MutualFriends,
  },

  pages: {
    FriendsPage,
    FollowersPage,
    FollowingPage,
    FriendRequestsPage,
    SuggestionsPage,
    BlockedUsersPage,
  },

  services: {
    ...socialApi,
  },

  hooks: {
    useFriends,
    useFollowers,
    useFollowing,
    useFriendRequests,
    useSuggestions,
  },

  store: {
    slice: socialSlice,
    selectors: socialSelectors,
    actions: socialActions,
  },

  routes: socialRoutes,

  validators,
  dto,
  constants,
};

export default SocialModule;