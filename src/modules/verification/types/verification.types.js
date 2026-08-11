// modules/verification/types/verification.types.js

/**
 * Mirrors backend VerificationDTO
 */

export const VerificationType = {
  id: "",
  type: "",
  status: "",
  fullName: "",
  reviewedAt: null,
  rejectionReason: "",
  createdAt: "",
};

export const VerificationRequest = {
  type: "",
  fullName: "",
  idNumber: "",
  registrationNumber: "",
  taxNumber: "",
  website: "",
  socialLinks: [],
  documents: [],
};

export const VerificationStats = {
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
};