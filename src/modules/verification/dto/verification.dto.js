// modules/verification/dto/verification.dto.js

class VerificationDTO {
  constructor(data = {}) {
    this.id = data.id;

    this.type = data.type;

    this.status = data.status;

    this.fullName = data.fullName;

    this.reviewedAt = data.reviewedAt;

    this.rejectionReason = data.rejectionReason;

    this.createdAt = data.createdAt;
  }
}

export default VerificationDTO;