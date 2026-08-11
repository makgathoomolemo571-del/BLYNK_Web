class AnalyticsDTO {
  constructor(data = {}) {
    this.id = data.id || data._id || null;

    this.eventType = data.eventType || "";

    this.actor = data.actor || null;

    this.targetId = data.targetId || null;

    this.targetType = data.targetType || "";

    this.metadata = data.metadata || {};

    this.createdAt = data.createdAt || null;
  }
}

export default AnalyticsDTO;