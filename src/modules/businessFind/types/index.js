/**
 * ==========================================
 * BLYNK BUSINESS FIND TYPES
 * ==========================================
 */

export const BusinessVisibility = Object.freeze({
  PUBLIC: "public",
  PRIVATE: "private",
  INVITE_ONLY: "invite_only",
});

export const BusinessCampaignStatus = Object.freeze({
  DRAFT: "draft",
  ACTIVE: "active",
  PAUSED: "paused",
  CLOSED: "closed",
  COMPLETED: "completed",
});

export const CompensationType = Object.freeze({
  PAID: "paid",
  TOKEN: "token",
  VOUCHER: "voucher",
  REVENUE_SHARE: "revenue_share",
  SPONSORSHIP: "sponsorship",
});

export const ApplicationStatus = Object.freeze({
  PENDING: "pending",
  REVIEWING: "reviewing",
  SHORTLISTED: "shortlisted",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
});

export const BusinessIndustry = Object.freeze({
  FASHION: "fashion",
  BEAUTY: "beauty",
  FOOD: "food",
  TECHNOLOGY: "technology",
  FINANCE: "finance",
  EDUCATION: "education",
  GAMING: "gaming",
  SPORTS: "sports",
  AUTOMOTIVE: "automotive",
  HEALTH: "health",
  FITNESS: "fitness",
  MUSIC: "music",
  ENTERTAINMENT: "entertainment",
  TRAVEL: "travel",
  REAL_ESTATE: "real_estate",
  AGRICULTURE: "agriculture",
  OTHER: "other",
});

export const CampaignObjectives = Object.freeze({
  BRAND_AWARENESS: "brand_awareness",
  SALES: "sales",
  PRODUCT_LAUNCH: "product_launch",
  APP_INSTALLS: "app_installs",
  WEBSITE_TRAFFIC: "website_traffic",
  EVENT_PROMOTION: "event_promotion",
  COMMUNITY_GROWTH: "community_growth",
  LEAD_GENERATION: "lead_generation",
});

export const DeliverableTypes = Object.freeze({
  POST: "post",
  REEL: "reel",
  STORY: "story",
  PODCAST: "podcast",
  LIVE_STREAM: "live_stream",
  REVIEW: "review",
  BLOG: "blog",
  VIDEO: "video",
});

export const BusinessFindPermissions = Object.freeze({
  CREATE_CAMPAIGN: "CREATE_CAMPAIGN",
  UPDATE_CAMPAIGN: "UPDATE_CAMPAIGN",
  DELETE_CAMPAIGN: "DELETE_CAMPAIGN",
  APPLY_CAMPAIGN: "APPLY_BUSINESS_FIND",
  VIEW_APPLICATIONS: "VIEW_APPLICATIONS",
  MANAGE_APPLICATIONS: "MANAGE_APPLICATIONS",
});

export default {
  BusinessVisibility,
  BusinessCampaignStatus,
  CompensationType,
  ApplicationStatus,
  BusinessIndustry,
  CampaignObjectives,
  DeliverableTypes,
  BusinessFindPermissions,
};