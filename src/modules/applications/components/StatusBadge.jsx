import React from "react";

const COLORS = {
  pending: {
    bg: "#FEF3C7",
    color: "#92400E",
    label: "Pending"
  },

  reviewed: {
    bg: "#DBEAFE",
    color: "#1E40AF",
    label: "Reviewed"
  },

  accepted: {
    bg: "#DCFCE7",
    color: "#166534",
    label: "Accepted"
  },

  rejected: {
    bg: "#FEE2E2",
    color: "#991B1B",
    label: "Rejected"
  },

  withdrawn: {
    bg: "#E5E7EB",
    color: "#374151",
    label: "Withdrawn"
  }
};

export default function StatusBadge({ status }) {

  const item =
    COLORS[status] ||
    COLORS.pending;

  return (

    <span
      style={{
        background: item.bg,
        color: item.color,
        padding: "6px 14px",
        borderRadius: "999px",
        fontWeight: 600,
        fontSize: 13,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 95
      }}
    >
      {item.label}
    </span>

  );

}