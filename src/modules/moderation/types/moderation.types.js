// modules/moderation/types/moderation.types.js

/**
 * Report DTO
 *
 * id
 * targetType
 * targetId
 * reason
 * severity
 * status
 * actionTaken
 * reviewedAt
 * createdAt
 */

export const ModerationReportShape = {

  id: "",

  targetType: "",

  targetId: "",

  reason: "",

  severity: "",

  status: "",

  actionTaken: "",

  reviewedAt: null,

  createdAt: null

};

/**
 * Create Report Payload
 */

export const CreateModerationPayload = {

  targetType: "",

  targetId: "",

  reason: "",

  description: ""

};

/**
 * Review Payload
 */

export const ReviewModerationPayload = {

  actionTaken: "",

  notes: ""

};

export default {

  ModerationReportShape,

  CreateModerationPayload,

  ReviewModerationPayload

};