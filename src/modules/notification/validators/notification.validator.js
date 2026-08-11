// modules/notification/validators/notification.validator.js

import * as yup from "yup";

export const notificationFilterSchema = yup.object({

  read: yup
    .boolean()
    .nullable(),

  type: yup
    .string()
    .trim()
    .nullable(),

  page: yup
    .number()
    .integer()
    .min(1)
    .default(1),

  limit: yup
    .number()
    .integer()
    .min(1)
    .max(100)
    .default(20)

});

export const markAsReadSchema = yup.object({

  id: yup
    .string()
    .required("Notification id is required")

});