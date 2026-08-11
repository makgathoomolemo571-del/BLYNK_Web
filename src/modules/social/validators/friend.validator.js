import * as yup from "yup";

const targetUser = yup
  .string()
  .trim()
  .required("Target user is required")
  .length(24, "Invalid user id");

const requestId = yup
  .string()
  .trim()
  .required("Request id is required")
  .length(24, "Invalid request id");

export const sendFriendRequestSchema = yup.object({
  targetUser,
});

export const cancelFriendRequestSchema = yup.object({
  requestId,
});

export const acceptFriendRequestSchema = yup.object({
  requestId,
});

export const rejectFriendRequestSchema = yup.object({
  requestId,
});

export const unfriendSchema = yup.object({
  targetUser,
});

export default {
  sendFriendRequestSchema,
  cancelFriendRequestSchema,
  acceptFriendRequestSchema,
  rejectFriendRequestSchema,
  unfriendSchema,
};