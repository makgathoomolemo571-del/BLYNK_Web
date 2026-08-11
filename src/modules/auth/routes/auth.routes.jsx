import React, { lazy } from "react";
import { Route } from "react-router-dom";

// Guards
import ProtectedRoute from "../../../shared/components/guards/ProtectedRoute";
import PublicOnlyRoute from "../../../shared/components/guards/PublicOnlyRoute";

// Pages (lazy loaded for production performance)
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("../pages/ResetPasswordPage"));
const VerifyEmailPage = lazy(() => import("../pages/VerifyEmailPage"));

/**
 * AUTH ROUTES (PRODUCTION READY)
 * - Public only routes (no auth required)
 * - Prevent logged-in users from accessing login/register
 */
const AuthRoutes = () => {
  return (
    <>
      {/* LOGIN */}
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />

      {/* REGISTER */}
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        }
      />

      {/* FORGOT PASSWORD */}
      <Route
        path="/forgot-password"
        element={
          <PublicOnlyRoute>
            <ForgotPasswordPage />
          </PublicOnlyRoute>
        }
      />

      {/* RESET PASSWORD */}
      <Route
        path="/reset-password/:token"
        element={
          <PublicOnlyRoute>
            <ResetPasswordPage />
          </PublicOnlyRoute>
        }
      />

      {/* VERIFY EMAIL */}
      <Route
        path="/verify-email/:token"
        element={<VerifyEmailPage />}
      />
    </>
  );
};

export default AuthRoutes;