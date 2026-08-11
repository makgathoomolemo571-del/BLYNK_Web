export const APPLICATION_STATUS = {
  PENDING: "pending",
  REVIEWED: "reviewed",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  WITHDRAWN: "withdrawn"
};

export const APPLICATION_STATUS_LABELS = {
  pending: "Pending",
  reviewed: "Reviewed",
  accepted: "Accepted",
  rejected: "Rejected",
  withdrawn: "Withdrawn"
};

export const APPLICATION_STATUS_COLORS = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",

  reviewed:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",

  accepted:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",

  rejected:
    "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",

  withdrawn:
    "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
};

export function getApplicationStatusLabel(status) {
  return (
    APPLICATION_STATUS_LABELS[status] ||
    "Unknown"
  );
}

export function getApplicationStatusColor(status) {
  return (
    APPLICATION_STATUS_COLORS[status] ||
    APPLICATION_STATUS_COLORS.pending
  );
}

export function canWithdraw(status) {
  return [
    APPLICATION_STATUS.PENDING,
    APPLICATION_STATUS.REVIEWED
  ].includes(status);
}

export function canUpdate(status) {
  return [
    APPLICATION_STATUS.PENDING,
    APPLICATION_STATUS.REVIEWED
  ].includes(status);
}

export function isFinished(status) {
  return [
    APPLICATION_STATUS.ACCEPTED,
    APPLICATION_STATUS.REJECTED,
    APPLICATION_STATUS.WITHDRAWN
  ].includes(status);
}

export default {
  APPLICATION_STATUS,
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_COLORS,
  getApplicationStatusLabel,
  getApplicationStatusColor,
  canWithdraw,
  canUpdate,
  isFinished
};