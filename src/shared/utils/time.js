const moment = require("moment");

/**
 * Get current timestamp
 */
function now() {
  return new Date();
}

/**
 * Add hours
 */
function addHours(date, hours) {
  return moment(date).add(hours, "hours").toDate();
}

/**
 * Add days
 */
function addDays(date, days) {
  return moment(date).add(days, "days").toDate();
}

/**
 * Check expired
 */
function isExpired(date) {
  return new Date(date) < new Date();
}

/**
 * Difference in hours
 */
function diffHours(a, b) {
  return moment(a).diff(moment(b), "hours");
}

/**
 * Format date
 */
function format(date) {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

module.exports = {

  now,
  addHours,
  addDays,
  isExpired,
  diffHours,
  format

};