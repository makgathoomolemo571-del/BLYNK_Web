import { Routes, Route } from "react-router-dom";

// ==========================================
// LAYOUTS
// ==========================================

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// ==========================================
// PUBLIC PAGES
// ==========================================

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import VerifyEmailPage from "../pages/VerifyEmail";

// ==========================================
// COMPANY
// ==========================================

import AboutPage from "../pages/company/AboutPage";
import CareersPage from "../pages/company/CareersPage";
import PressPage from "../pages/company/PressPage";
import ContactPage from "../pages/company/ContactPage";

// ==========================================
// LEGAL
// ==========================================

import TermsPage from "../pages/legal/TermsPage";
import PrivacyPage from "../pages/legal/PrivacyPage";
import CommunityGuidelinesPage from "../pages/legal/CommunityGuidelinesPage";
import CookiesPage from "../pages/legal/CookiesPage";
import CopyrightPage from "../pages/legal/CopyrightPage";

// ==========================================
// FEATURES
// ==========================================

import SocialFeedFeaturePage from "../pages/features/SocialFeedFeaturePage";
import ReelsStoriesFeaturePage from "../pages/features/ReelsStoriesFeaturePage";
import PodcastsFeaturePage from "../pages/features/PodcastsFeaturePage";
import MarketplaceFeaturePage from "../pages/features/MarketplaceFeaturePage";
import WalletFeaturePage from "../pages/features/WalletFeaturePage";
import CreatorStudioFeaturePage from "../pages/features/CreatorStudioFeaturePage";

// ==========================================
// PLATFORM
// ==========================================

import SubscriptionsPlatformPage from "../pages/platform/SubscriptionsPlatformPage";
import StudioPlatformPage from "../pages/platform/StudioPlatformPage";
import MarketplacePlatformPage from "../pages/platform/MarketplacePlatformPage";
import MonetizationPlatformPage from "../pages/platform/MonetizationPlatformPage";

// ==========================================
// SUPPORT
// ==========================================

import Support from "../pages/Support";
import HelpCenterPage from "../pages/support/HelpCenterPage";

import SupportDashboard from "../modules/support/pages/SupportDashboard";
import CreateTicket from "../modules/support/pages/CreateTicket";
import TicketDetails from "../modules/support/pages/TicketDetails";

// ==========================================
// POSTS
// ==========================================

import FeedPage from "../modules/post/pages/FeedPage";
import CreatePostPage from "../modules/post/pages/CreatePostPage";
import MyPostsPage from "../modules/post/pages/MyPostsPage";
import PostDetailsPage from "../modules/post/pages/PostDetailsPage";
import EditPostPage from "../modules/post/pages/EditPostPage";

// ==========================================
// REELS
// ==========================================

import ReelFeedPage from "../modules/reel/pages/ReelFeedPage";
import CreateReelPage from "../modules/reel/pages/CreateReelPage";
import MyReelsPage from "../modules/reel/pages/MyReelsPage";
import ReelDetailsPage from "../modules/reel/pages/ReelDetailsPage";

// ==========================================
// STORIES
// ==========================================

import StoryFeedPage from "../modules/story/pages/StoryFeedPage";
import CreateStoryPage from "../modules/story/pages/CreateStoryPage";
import StoryViewer from "../modules/story/components/StoryViewer";
import StoryRepliesPage from "../modules/story/pages/StoryRepliesPage";
import StoryReactions from "../modules/story/components/StoryReactions";

// ==========================================
// NOTIFICATIONS
// ==========================================

import NotificationsPage from "../modules/notification/pages/NotificationsPage";

// ==========================================
// MARKETPLACE
// ==========================================

import MarketplacePage from "../modules/marketplace/pages/MarketplacePage";
import CreateMarketplacePage from "../modules/marketplace/pages/CreateMarketplacePage";
import MarketplaceDetailsPage from "../modules/marketplace/pages/MarketplaceDetailsPage";

// ==========================================
// WALLET
// ==========================================

import WalletPage from "../modules/wallet/pages/WalletPage";
import WalletRewardsPage from "../modules/wallet/pages/WalletRewardsPage";
import WalletTransactionsPage from "../modules/wallet/pages/WalletTransactionsPage";

// ==========================================
// SUBSCRIPTIONS
// ==========================================

import SubscriptionPage from "../modules/subscription/pages/SubscriptionPage";

// ==========================================
// PODCASTS
// ==========================================

import PodcastsPage from "../modules/podcast/pages/PodcastsPage";
import CreatePodcastPage from "../modules/podcast/pages/CreatePodcastPage";
import PodcastDetailsPage from "../modules/podcast/pages/PodcastDetailsPage";

// ==========================================
// EPISODES
// ==========================================

import CreateEpisodePage from "../modules/episode/pages/CreateEpisodePage";
import PodcastEpisodesPage from "../modules/episode/pages/PodcastEpisodesPage";

// ==========================================
// BUSINESS
// ==========================================

import BusinessFindPage from "../modules/businessFind/pages/BusinessFindPage";
import BusinessDetailsPage from "../modules/businessFind/pages/BusinessDetailsPage";
import BusinessStudio from "../modules/businessFind/pages/BusinessStudio";
import CreateBusinessRequestPage from "../modules/businessFind/pages/CreateBusinessRequestPage";

// ==========================================
// CREATOR
// ==========================================

import CreatorHirePage from "../modules/creatorHire/pages/CreatorHirePage";
import CreatorHireDetailsPage from "../modules/creatorHire/pages/CreatorHireDetailsPage";
import CreatorHireForm from "../modules/creatorHire/components/CreatorHireForm";
import CreatorStudio from "../modules/creatorHire/pages/CreatorStudio";

// ==========================================
// APPLICATIONS
// ==========================================

import MyApplicationsPage from "../modules/applications/pages/MyApplicationsPage";
import ApplicationDetails from "../modules/applications/pages/ApplicationDetails";

// ==========================================
// WATCH PARTIES
// ==========================================

import CreateWatchPartyPage from "../modules/watchParty/pages/CreateWatchPartyPage";
import WatchPartyHome from "../modules/watchParty/pages/WatchPartyHome";
import WatchPartyDetails from "../modules/watchParty/pages/WatchPartyDetails";
import WatchPartyStudio from "../modules/watchParty/pages/WatchPartyStudio";

// ==========================================
// MONETIZATION
// ==========================================

import EarningsDashboard from "../modules/monetization/pages/EarningsDashboard";

// ==========================================
// RECOMMENDATIONS
// ==========================================

import DiscoverPage from "../modules/recommendation/pages/DiscoverPage";
import RecommendationPage from "../modules/recommendation/pages/RecommendationPage";
import TrendingPage from "../modules/recommendation/pages/TrendingPage";

// ==========================================
// SPONSORSHIPS
// ==========================================

import SponsorshipDashboard from "../modules/sponsorship/pages/SponsorshipDashboard";
import CreateSponsorship from "../modules/sponsorship/pages/CreateSponsorship";
import SponsorshipDetails from "../modules/sponsorship/pages/SponsorshipDetails";
import SponsorshipApplications from "../modules/sponsorship/pages/SponsorshipApplications";

// ==========================================
// ADVERTISEMENTS
// ==========================================

import CreateAdvertisement from "../modules/advertisements/pages/CreateAdvertisement";

// ==========================================
// MESSAGES
// ==========================================

import ChatPage from "../modules/messages/pages/ChatPage";
import ConversationsPage from "../modules/messages/pages/ConversationsPage";

// ==========================================
// PROFILE
// ==========================================

import ProfilePage from "../modules/profile/pages/ProfilePage";
import EditProfilePage from "../modules/profile/pages/EditProfilePage";

// ==========================================
// SOCIAL
// ==========================================

import SuggestionsPage from "../modules/social/pages/SuggestionsPage";
import FriendsPage from "../modules/social/pages/FriendsPage";
import FriendRequestsPage from "../modules/social/pages/FriendRequestsPage";
import FollowersPage from "../modules/social/pages/FollowersPage";
import FollowingPage from "../modules/social/pages/FollowingPage";
import BlockedUsersPage from "../modules/social/pages/BlockedUsersPage";


function Router() {

  return (

    <Routes>

      {/* =====================================================
          PUBLIC
      ===================================================== */}

      <Route element={<PublicLayout />}>

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/verify-email"
          element={<VerifyEmailPage />}
        />


        {/* COMPANY */}

        <Route
          path="/company/about"
          element={<AboutPage />}
        />

        <Route
          path="/company/careers"
          element={<CareersPage />}
        />

        <Route
          path="/company/press"
          element={<PressPage />}
        />

        <Route
          path="/company/contact"
          element={<ContactPage />}
        />


        {/* LEGAL */}

        <Route
          path="/legal/terms"
          element={<TermsPage />}
        />

        <Route
          path="/legal/privacy"
          element={<PrivacyPage />}
        />

        <Route
          path="/legal/community"
          element={<CommunityGuidelinesPage />}
        />

        <Route
          path="/legal/cookies"
          element={<CookiesPage />}
        />

        <Route
          path="/legal/copyright"
          element={<CopyrightPage />}
        />


        {/* SUPPORT */}

        <Route
          path="/support"
          element={<Support />}
        />

        <Route
          path="/help"
          element={<HelpCenterPage />}
        />


        {/* FEATURES */}

        <Route
          path="/features/social"
          element={<SocialFeedFeaturePage />}
        />

        <Route
          path="/features/reels"
          element={<ReelsStoriesFeaturePage />}
        />

        <Route
          path="/features/podcasts"
          element={<PodcastsFeaturePage />}
        />

        <Route
          path="/features/marketplace"
          element={<MarketplaceFeaturePage />}
        />

        <Route
          path="/features/wallet"
          element={<WalletFeaturePage />}
        />

        <Route
          path="/features/creators"
          element={<CreatorStudioFeaturePage />}
        />


        {/* PLATFORM */}

        <Route
          path="/platform/subscriptions"
          element={<SubscriptionsPlatformPage />}
        />

        <Route
          path="/platform/studio"
          element={<StudioPlatformPage />}
        />

        <Route
          path="/platform/marketplace"
          element={<MarketplacePlatformPage />}
        />

        <Route
          path="/platform/monetization"
          element={<MonetizationPlatformPage />}
        />

      </Route>


      {/* =====================================================
          AUTH
      ===================================================== */}

      <Route element={<AuthLayout />}>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Route>


      {/* =====================================================
          DASHBOARD
      ===================================================== */}

      <Route element={<DashboardLayout />}>


        {/* POSTS */}

        <Route
          path="/feed"
          element={<FeedPage />}
        />

        <Route
          path="/posts/create"
          element={<CreatePostPage />}
        />

        <Route
          path="/posts/my"
          element={<MyPostsPage />}
        />

        <Route
          path="/posts/:id"
          element={<PostDetailsPage />}
        />

        <Route
          path="/posts/:id/edit"
          element={<EditPostPage />}
        />


        {/* REELS */}

        <Route
          path="/reels"
          element={<ReelFeedPage />}
        />

        <Route
          path="/create-reel"
          element={<CreateReelPage />}
        />

        <Route
          path="/my-reels"
          element={<MyReelsPage />}
        />

        <Route
          path="/reels/:id"
          element={<ReelDetailsPage />}
        />


        {/* STORIES */}

        <Route
          path="/stories"
          element={<StoryFeedPage />}
        />

        <Route
          path="/stories/create"
          element={<CreateStoryPage />}
        />

        <Route
          path="/stories/:id"
          element={<StoryViewer />}
        />

        <Route
          path="/stories/:id/reply"
          element={<StoryRepliesPage />}
        />

        <Route
          path="/stories/:id/react"
          element={<StoryReactions />}
        />


        {/* NOTIFICATIONS */}

        <Route
          path="/notifications"
          element={<NotificationsPage />}
        />


        {/* MARKETPLACE */}

        <Route
          path="/marketplace"
          element={<MarketplacePage />}
        />

        <Route
          path="/marketplace/create"
          element={<CreateMarketplacePage />}
        />

        <Route
          path="/marketplace/:id"
          element={<MarketplaceDetailsPage />}
        />


        {/* WALLET */}

        <Route
          path="/wallet"
          element={<WalletPage />}
        />

        <Route
          path="/wallet/rewards"
          element={<WalletRewardsPage />}
        />

        <Route
          path="/wallet/transactions"
          element={<WalletTransactionsPage />}
        />


        {/* SUBSCRIPTIONS */}

        <Route
          path="/subscriptions"
          element={<SubscriptionPage />}
        />


        {/* PODCASTS */}

        <Route
          path="/podcasts"
          element={<PodcastsPage />}
        />

        <Route
          path="/podcasts/create"
          element={<CreatePodcastPage />}
        />

        <Route
          path="/podcasts/:podcastId"
          element={<PodcastDetailsPage />}
        />

        <Route
          path="/podcasts/:podcastId/episodes"
          element={<PodcastEpisodesPage />}
        />

        <Route
          path="/podcasts/:podcastId/episodes/create"
          element={<CreateEpisodePage />}
        />


        {/* BUSINESS */}

        <Route
          path="/business"
          element={<BusinessFindPage />}
        />

        <Route
          path="/business/create"
          element={<CreateBusinessRequestPage />}
        />

        <Route
          path="/business-find/:id"
          element={<BusinessDetailsPage />}
        />

        <Route
          path="/business-studio"
          element={<BusinessStudio />}
        />


        {/* CREATOR */}

        <Route
          path="/creator"
          element={<CreatorHirePage />}
        />

        <Route
          path="/creator-hire/create"
          element={<CreatorHireForm />}
        />

        <Route
          path="/creator-hire/:id"
          element={<CreatorHireDetailsPage />}
        />

        <Route
          path="/creator-studio"
          element={<CreatorStudio />}
        />


        {/* APPLICATIONS */}

        <Route
          path="/applications/my"
          element={<MyApplicationsPage />}
        />

        <Route
          path="/business-find/:id/applications"
          element={<ApplicationDetails />}
        />

        <Route
          path="/creator-hire/:id/applications"
          element={<ApplicationDetails />}
        />


        {/* WATCH PARTIES */}

        <Route
          path="/watchparties"
          element={<WatchPartyHome />}
        />

        <Route
          path="/watchparties/live"
          element={<WatchPartyHome />}
        />

        <Route
          path="/watchparties/:id"
          element={<WatchPartyDetails />}
        />

        <Route
          path="/watchparties/:id/studio"
          element={<WatchPartyStudio />}
        />

        <Route
          path="/watchparties/create"
          element={<CreateWatchPartyPage />}
        />


        {/* MONETIZATION */}

        <Route
          path="/monetization/dashboard"
          element={<EarningsDashboard />}
        />


        {/* MESSAGES */}

        <Route
          path="/messages"
          element={<ConversationsPage />}
        />

        <Route
          path="/messages/:conversationId"
          element={<ChatPage />}
        />

        <Route
          path="/conversations"
          element={<ConversationsPage />}
        />


        {/* RECOMMENDATIONS */}

        <Route
          path="/recommendations"
          element={<RecommendationPage />}
        />

        <Route
          path="/recommendations/discover"
          element={<DiscoverPage />}
        />

        <Route
          path="/recommendations/trending"
          element={<TrendingPage />}
        />


        {/* PROFILE */}

        <Route
          path="/profile"
          element={<ProfilePage />}
        />

        <Route
          path="/profile/:userId"
          element={<ProfilePage />}
        />

        <Route
          path="/profile/edit"
          element={<EditProfilePage />}
        />


        {/* SOCIAL */}

        <Route
          path="/social"
          element={<SuggestionsPage />}
        />

        <Route
          path="/friends"
          element={<FriendsPage />}
        />

        <Route
          path="/friend-requests"
          element={<FriendRequestsPage />}
        />

        <Route
          path="/followers"
          element={<FollowersPage />}
        />

        <Route
          path="/following"
          element={<FollowingPage />}
        />

        <Route
          path="/blocked-users"
          element={<BlockedUsersPage />}
        />


        {/* SUPPORT */}

        <Route
          path="/support/dashboard"
          element={<SupportDashboard />}
        />

        <Route
          path="/support/create"
          element={<CreateTicket />}
        />

        <Route
          path="/support/ticket/:id"
          element={<TicketDetails />}
        />


        {/* SPONSORSHIPS */}

        <Route
          path="/sponsorships"
          element={<SponsorshipDashboard />}
        />

        <Route
          path="/sponsorships/create"
          element={<CreateSponsorship />}
        />

        <Route
          path="/sponsorships/:id"
          element={<SponsorshipDetails />}
        />

        <Route
          path="/sponsorships/:id/applications"
          element={<SponsorshipApplications />}
        />


        {/* ADVERTISEMENTS */}

        <Route
          path="/advertisements/create"
          element={<CreateAdvertisement />}
        />

      </Route>


      {/* =====================================================
          404
      ===================================================== */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>

  );

}


export default Router;