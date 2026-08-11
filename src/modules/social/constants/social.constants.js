// modules/social/constants/social.constants.js

const SOCIAL = Object.freeze({

  API: "/social",

  RELATIONSHIPS: {
    FRIEND: "friend",
    FOLLOW: "follow",
    SUBSCRIBER: "subscriber",
    BLOCKED: "blocked",
    MUTED: "muted",
    CLOSE_FRIEND: "close_friend"
  },

  STATUS: {
    PENDING: "pending",
    ACCEPTED: "accepted",
    REJECTED: "rejected",
    CANCELLED: "cancelled"
  },

  ROUTES: {

    FOLLOW: "/follow",
    UNFOLLOW: "/unfollow",

    BLOCK: "/block",
    UNBLOCK: "/unblock",

    MUTE: "/mute",
    UNMUTE: "/unmute",

    FOLLOWERS: "/followers",
    FOLLOWING: "/following",

    FRIENDS: "/friends",

    SUGGESTIONS: "/suggestions",

    FRIEND_REQUESTS: "/friend-requests",

    SENT_REQUESTS: "/sent-requests",

    SEND_REQUEST: "/friend/request",

    ACCEPT_REQUEST: "/friend/accept",

    REJECT_REQUEST: "/friend/reject",

    CANCEL_REQUEST: "/friend/cancel",

    UNFRIEND: "/friend/unfriend"

  }

});

export default SOCIAL;