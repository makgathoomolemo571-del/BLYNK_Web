class RecommendationDTO {
  constructor(data = {}) {
    this.id = data.id || data._id;

    this.type = data.type;

    this.targetId = data.targetId;

    this.score = data.score;

    this.reason = data.reason;

    this.createdAt = data.createdAt;

    this.updatedAt = data.updatedAt;
  }
}

module.exports = RecommendationDTO;