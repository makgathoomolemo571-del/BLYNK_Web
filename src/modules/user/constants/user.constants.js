const USER_ROLES = {
  MEMBER: "member",
  CREATOR: "creator",
  BUSINESS: "business",
  ADMIN: "admin",
  SUPERADMIN: "superadmin",
};

const USER_STATUS = {
  ACTIVE: "active",
  SUSPENDED: "suspended",
  BANNED: "banned",
};

const USER_VISIBILITY = {
  PUBLIC: "public",
  PRIVATE: "private",
};

const USER_RELATIONSHIP = {
  NONE: "none",
  FOLLOWING: "following",
  FOLLOWER: "follower",
  FRIEND: "friend",
  BLOCKED: "blocked",
};

module.exports = {
  USER_ROLES,
  USER_STATUS,
  USER_VISIBILITY,
  USER_RELATIONSHIP,
};