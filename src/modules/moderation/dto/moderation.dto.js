// modules/moderation/dto/moderation.dto.js

class ModerationDTO {

  constructor(data) {

    this.id = data.id;

    this.targetType = data.targetType;

    this.targetId = data.targetId;

    this.reason = data.reason;

    this.severity = data.severity;

    this.status = data.status;

    this.actionTaken = data.actionTaken;

    this.reviewedAt = data.reviewedAt;

    this.createdAt = data.createdAt;

  }

}

module.exports = ModerationDTO;