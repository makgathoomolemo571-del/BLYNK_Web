// modules/businessFind/routes/businessFind.routes.jsx

import { lazy } from "react";
import { Navigate } from "react-router-dom";

import DashboardLayout from "../../../layouts/DashboardLayout";

import ProtectedRoute from "../../../shared/components/ProtectedRoute";
import PermissionGuard from "../../../shared/components/PermissionGuard";

import permissions from "../../../config/permissions";

const BusinessFindPage = lazy(() =>
  import("../pages/BusinessFindPage")
);

const BusinessDetailsPage = lazy(() =>
  import("../pages/BusinessDetailsPage")
);

const MyApplicationsPage = lazy(() =>
  import("../pages/MyApplicationsPage")
);

const CreateBusinessRequestPage = lazy(() =>
  import("../pages/CreateBusinessRequestPage")
);

const routes = [
  {
    path: "/business",

    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <Navigate to="campaigns" replace />
      },

      {
        path: "campaigns",

        element: (
          <PermissionGuard
            permission={
              permissions.FEATURES.APPLY_BUSINESS_FIND
            }
          >
            <BusinessFindPage />
          </PermissionGuard>
        )
      },

      {
        path: "campaigns/new",

        element: (
          <PermissionGuard
            permission={
              permissions.FEATURES.APPLY_BUSINESS_FIND
            }
          >
            <CreateBusinessRequestPage />
          </PermissionGuard>
        )
      },

      {
        path: "campaigns/:id",

        element: (
          <PermissionGuard
            permission={
              permissions.FEATURES.APPLY_BUSINESS_FIND
            }
          >
            <BusinessDetailsPage />
          </PermissionGuard>
        )
      },

      {
        path: "applications",

        element: (
          <PermissionGuard
            permission={
              permissions.FEATURES.APPLY_BUSINESS_FIND
            }
          >
            <MyApplicationsPage />
          </PermissionGuard>
        )
      }
    ]
  }
];

export default routes;