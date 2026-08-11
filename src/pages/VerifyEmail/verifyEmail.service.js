import api from "../../config/api";

export const verifyEmail = async (token) => {
    if (!token) {
        throw new Error("Missing verification token.");
    }

    const res = await api.post(
        "/auth/verify-email",
        {
            token
        }
    );

    return res.data;
};

export const resendVerificationEmail = async (email) => {
    if (!email) {
        throw new Error("Email address is required.");
    }

    const res = await api.post(
        "/auth/resend-verification",
        {
            email
        }
    );

    return res.data;
};