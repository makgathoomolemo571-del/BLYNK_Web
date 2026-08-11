const subscriptionRules =
require("../config/subscriptionRules");

/**
 * Check if user can access feature
 */
function canAccess(plan, feature) {

  const allowed =
    subscriptionRules.MATRIX[plan] || [];

  return allowed.includes(feature);

}

/**
 * Get full plan config
 */
function getPlan(plan) {

  return subscriptionRules[plan] || null;

}

/**
 * Check feature usage limit
 */
function checkLimit(plan, key, usage) {

  const planData = getPlan(plan);

  if (!planData) return false;

  const limit = planData.limits?.[key];

  if (limit === -1) return true; // unlimited

  return usage < limit;

}

module.exports = {

  canAccess,
  getPlan,
  checkLimit

};