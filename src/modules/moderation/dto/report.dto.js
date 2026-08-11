// modules/moderation/dto/report.dto.js

class ReportDTO {

  constructor(data) {

    this.id = data.id;

    this.targetType = data.targetType;

    this.targetId = data.targetId;

    this.reason = data.reason;

    this.description = data.description;

    this.severity = data.severity;

    this.status = data.status;

    this.actionTaken = data.actionTaken;

    this.reviewedBy = data.reviewedBy;

    this.reviewedAt = data.reviewedAt;

    this.resolutionNotes = data.resolutionNotes;

    this.createdAt = data.createdAt;

  }

}

module.exports = ReportDTO;