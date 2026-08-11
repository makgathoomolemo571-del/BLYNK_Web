import * as yup from "yup";

export const profileValidator = yup.object({

firstName: yup.string().max(50),

lastName: yup.string().max(50),

displayName: yup.string().max(50),

bio: yup.string().max(250),

website: yup.string().url().nullable(),

location: yup.string().max(100),

profilePicture: yup.string().url().nullable(),

coverBanner: yup.string().url().nullable()

});