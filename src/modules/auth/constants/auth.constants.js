const AUTH_CONSTANTS = {

  // ======================
  // TOKEN CONFIG
  // ======================
  TOKEN: {
    ACCESS_EXPIRES_IN: "15m",
    REFRESH_EXPIRES_IN: "30d",
    ISSUER: "BLYNK_PLATFORM",
    AUDIENCE: "BLYNK_USERS"
  },

  // ======================
  // PASSWORD RULES
  // ======================
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 64,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SYMBOL: true
  },

  // ======================
  // USERNAME RULES
  // ======================
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
    ALLOWED_REGEX: "^[a-zA-Z0-9_]+$"
  },

  // ======================
  // LOGIN SECURITY
  // ======================
  LOGIN: {
    MAX_ATTEMPTS: 5,
    LOCK_TIME_MINUTES: 15,
    OTP_EXPIRY_MINUTES: 10
  },

  // ======================
  // OTP / VERIFICATION
  // ======================
  VERIFICATION: {
    EMAIL_TOKEN_EXPIRY_MINUTES: 30,
    RESET_PASSWORD_EXPIRY_MINUTES: 15,
    OTP_LENGTH: 6
  },

  // ======================
  // ROLES (SYNC WITH BACKEND)
  // ======================
  ROLES: {
    MEMBER: "member",
    CREATOR: "creator",
    BUSINESS: "business",
    ADMIN: "admin",
    SUPERADMIN: "superadmin"
  },

  // ======================
  // AUTH EVENTS (FOR SOCKET / EVENT SYSTEM)
  // ======================
  EVENTS: {
    USER_REGISTERED: "USER_REGISTERED",
    USER_LOGGED_IN: "USER_LOGGED_IN",
    USER_LOGGED_OUT: "USER_LOGGED_OUT",
    PASSWORD_RESET_REQUESTED: "PASSWORD_RESET_REQUESTED",
    PASSWORD_CHANGED: "PASSWORD_CHANGED",
    EMAIL_VERIFIED: "EMAIL_VERIFIED",
    ACCOUNT_LOCKED: "ACCOUNT_LOCKED"
  },

  // ======================
  // ERROR CODES (FRONT + BACK CONSISTENCY)
  // ======================
  ERRORS: {
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
    USER_NOT_FOUND: "USER_NOT_FOUND",
    ACCOUNT_LOCKED: "ACCOUNT_LOCKED",
    EMAIL_NOT_VERIFIED: "EMAIL_NOT_VERIFIED",
    TOKEN_EXPIRED: "TOKEN_EXPIRED",
    TOKEN_INVALID: "TOKEN_INVALID",
    WEAK_PASSWORD: "WEAK_PASSWORD",
    USERNAME_TAKEN: "USERNAME_TAKEN"
  },

  // ======================
  // STORAGE KEYS (FRONTEND SAFE)
  // ======================
  STORAGE: {
    ACCESS_TOKEN: "blynk_access_token",
    REFRESH_TOKEN: "blynk_refresh_token",
    USER: "blynk_user"
  }

};

export default AUTH_CONSTANTS;