// modules/support/dto/support.dto.js

export default class SupportDTO {

  constructor(data = {}) {

    this.id = data.id;

    this.ticketNumber =
      data.ticketNumber;

    this.subject =
      data.subject;

    this.issueType =
      data.issueType;

    this.priority =
      data.priority;

    this.status =
      data.status;

    this.assignedAgent =
      data.assignedAgent;

    this.createdAt =
      data.createdAt;

    this.updatedAt =
      data.updatedAt;

  }

  static fromApi(data) {

    return new SupportDTO({

      id:
        data.id,

      ticketNumber:
        data.ticketNumber,

      subject:
        data.subject,

      issueType:
        data.issueType,

      priority:
        data.priority,

      status:
        data.status,

      assignedAgent:
        data.assignedAgent,

      createdAt:
        data.createdAt,

      updatedAt:
        data.updatedAt

    });

  }

}