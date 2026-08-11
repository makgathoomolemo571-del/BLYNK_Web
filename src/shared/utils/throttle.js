const memory = new Map();

/**
 * Simple in-memory throttle
 */
function throttle(key, limit = 5, windowMs = 60000) {

  const now = Date.now();

  const record = memory.get(key) || {
    count: 0,
    start: now
  };

  if (now - record.start > windowMs) {

    record.count = 0;
    record.start = now;

  }

  record.count++;

  memory.set(key, record);

  return record.count <= limit;

}

/**
 * Reset throttle for key
 */
function resetThrottle(key) {

  memory.delete(key);

}

module.exports = {

  throttle,
  resetThrottle

};