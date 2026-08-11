// modules/marketplace/types/marketplace.types.js

/**
 * Marketplace Listing
 */
export const MarketplaceType = {

  id: "",

  creator: null,

  listingType: "",

  title: "",

  category: "",

  description: "",

  price: 0,

  budgetRange: "",

  location: "",

  visibility: "public",

  applicationCount: 0,

  createdAt: null
};

/**
 * Marketplace Application
 */

export const MarketplaceApplicationType = {

  applicant: null,

  message: "",

  proposedPrice: 0,

  status: "pending",

  createdAt: null
};

export default {
  MarketplaceType,
  MarketplaceApplicationType
};