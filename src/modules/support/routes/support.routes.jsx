// modules/support/routes/support.routes.jsx

import { lazy } from "react";
import { Navigate } from "react-router-dom";

const SupportDashboard = lazy(() => import("../pages/SupportDashboard"));
const CreateTicket = lazy(() => import("../pages/CreateTicket"));
const TicketDetails = lazy(() => import("../pages/TicketDetails"));
const MyTickets = lazy(() => import("../pages/MyTickets"));

const supportRoutes = [
  {
    path: "/support",
    children: [
      {
        index: true,
        element: <Navigate to="/support/dashboard" replace />
      },
      {
        path: "dashboard",
        element: <SupportDashboard />
      },
      {
        path: "new",
        element: <CreateTicket />
      },
      {
        path: "my-tickets",
        element: <MyTickets />
      },
      {
        path: ":ticketId",
        element: <TicketDetails />
      }
    ]
  }
];

export default supportRoutes;