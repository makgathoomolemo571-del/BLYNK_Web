// modules/verification/routes/verification.routes.jsx

import React from "react";
import { Navigate } from "react-router-dom";

import VerificationPage from "../pages/VerificationPage";
import ApplyVerification from "../pages/ApplyVerification";
import VerificationStatusPage from "../pages/VerificationStatusPage";

const verificationRoutes = [
  {
    path: "/verification",
    element: <VerificationPage />
  },
  {
    path: "/verification/apply",
    element: <ApplyVerification />
  },
  {
    path: "/verification/status",
    element: <VerificationStatusPage />
  },
  {
    path: "/verify",
    element: <Navigate to="/verification" replace />
  }
];

export default verificationRoutes;