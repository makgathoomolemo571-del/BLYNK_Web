// modules/subscription/dto/PlanDTO.js

class PlanDTO {
  constructor(key, data) {
    this.key = key;
    this.name = data?.name || data?.displayName || null;
    this.price = data?.price ?? 0;
    this.currency = data?.currency || "ZAR";
    this.billing = data?.billing || "monthly";
    this.limits = data?.limits || {};
    this.features = data?.features || {};
  }
}

module.exports = PlanDTO;