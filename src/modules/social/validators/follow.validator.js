import * as yup from "yup";

export const followSchema = yup.object({
  targetUser: yup
    .string()
    .trim()
    .required("Target user is required")
    .length(24, "Invalid user id"),
});

export const unfollowSchema = yup.object({
  targetUser: yup
    .string()
    .trim()
    .required("Target user is required")
    .length(24, "Invalid user id"),
});

export const blockSchema = yup.object({
  targetUser: yup
    .string()
    .trim()
    .required("Target user is required")
    .length(24, "Invalid user id"),
});

export const unblockSchema = yup.object({
  targetUser: yup
    .string()
    .trim()
    .required("Target user is required")
    .length(24, "Invalid user id"),
});

export const muteSchema = yup.object({
  targetUser: yup
    .string()
    .trim()
    .required("Target user is required")
    .length(24, "Invalid user id"),
});

export const unmuteSchema = yup.object({
  targetUser: yup
    .string()
    .trim()
    .required("Target user is required")
    .length(24, "Invalid user id"),
});

export default {
  followSchema,
  unfollowSchema,
  blockSchema,
  unblockSchema,
  muteSchema,
  unmuteSchema,
};