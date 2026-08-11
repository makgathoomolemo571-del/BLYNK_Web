// modules/watchParty/types/watchParty.types.js

export const WATCH_PARTY_STATUS = Object.freeze({
  SCHEDULED: "scheduled",
  LIVE: "live",
  ENDED: "ended"
});

export const WATCH_PARTY_TYPE = Object.freeze({
  CREATOR_LIVE: "creator_live",
  BUSINESS_LIVE: "business_live",
  VENUE_LIVE: "venue_live",
  WATCH_PARTY: "watch_party"
});

export const WATCH_PARTY_VISIBILITY = Object.freeze({
  PUBLIC: "public",
  FOLLOWERS: "followers",
  SUBSCRIBERS: "subscribers",
  PRIVATE: "private"
});

export const DEFAULT_WATCH_PARTY = Object.freeze({
  id: "",
  creator: null,
  title: "",
  description: "",
  type: WATCH_PARTY_TYPE.WATCH_PARTY,
  thumbnail: "",
  status: WATCH_PARTY_STATUS.SCHEDULED,
  visibility: WATCH_PARTY_VISIBILITY.PUBLIC,
  viewerCount: 0,
  startedAt: null,
  endedAt: null,
  createdAt: null
});

export const WATCH_PARTY_ACTIONS = Object.freeze({
  CREATE: "CREATE_WATCH_PARTY",
  GET: "GET_WATCH_PARTY",
  GET_LIVE: "GET_LIVE_WATCH_PARTIES",
  START: "START_WATCH_PARTY",
  END: "END_WATCH_PARTY",
  JOIN: "JOIN_WATCH_PARTY",
  LEAVE: "LEAVE_WATCH_PARTY",
  DELETE: "DELETE_WATCH_PARTY"
});

export const WATCH_PARTY_EVENTS = Object.freeze({
  CREATED: "WATCHPARTY_CREATED",
  STARTED: "WATCHPARTY_STARTED",
  ENDED: "WATCHPARTY_ENDED",
  JOINED: "WATCHPARTY_JOINED",
  LEFT: "WATCHPARTY_LEFT",
  DELETED: "WATCHPARTY_DELETED"
});

export const WATCH_PARTY_PERMISSIONS = Object.freeze({
  CREATE: "GO_LIVE",
  JOIN: "SEND_MESSAGE",
  VIEW: "VIEW_CONTENT"
});