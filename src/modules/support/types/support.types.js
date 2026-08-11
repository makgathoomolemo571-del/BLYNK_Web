/**
 * Backend SupportDTO
 *
 * {
 *   id,
 *   ticketNumber,
 *   subject,
 *   issueType,
 *   priority,
 *   status,
 *   assignedAgent,
 *   createdAt,
 *   updatedAt
 * }
 */

export const createEmptySupportTicket = () => ({
  id: "",
  ticketNumber: "",
  subject: "",
  issueType: "",
  priority: "medium",
  status: "open",
  assignedAgent: null,
  createdAt: null,
  updatedAt: null,
});

export const createSupportForm = () => ({
  subject: "",
  issueType: "",
  description: "",
  affectedFeature: "",
  priority: "medium",
});

export const createSupportStats = () => ({
  total: 0,
  open: 0,
  resolved: 0,
  closed: 0,
});

export const isSupportOpen = (ticket) =>
  ticket?.status === "open";

export const isSupportResolved = (ticket) =>
  ticket?.status === "resolved";

export const isSupportClosed = (ticket) =>
  ticket?.status === "closed";

export const canCloseTicket = (ticket) =>
  ticket?.status !== "closed";

export const canResolveTicket = (ticket) =>
  ticket?.status !== "resolved";

export const isAssigned = (ticket) =>
  ticket?.assignedAgent !== null &&
  ticket?.assignedAgent !== undefined;

export default {
  createEmptySupportTicket,
  createSupportForm,
  createSupportStats,
  isSupportOpen,
  isSupportResolved,
  isSupportClosed,
  canCloseTicket,
  canResolveTicket,
  isAssigned,
};