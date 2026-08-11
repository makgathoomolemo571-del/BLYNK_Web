import {
  Check,
  CheckCheck
} from "lucide-react";

export default function ReadReceipt({
  status = "sent",
  readAt = null,
  className = ""
}) {

  if (status === "sent") {
    return (
      <span
        className={`inline-flex items-center text-zinc-400 ${className}`}
        title="Sent"
      >
        <Check size={14} />
      </span>
    );
  }

  if (status === "delivered") {
    return (
      <span
        className={`inline-flex items-center text-zinc-400 ${className}`}
        title="Delivered"
      >
        <CheckCheck size={14} />
      </span>
    );
  }

  if (status === "read") {
    return (
      <span
        className={`inline-flex items-center text-sky-500 ${className}`}
        title={
          readAt
            ? `Read ${new Date(readAt).toLocaleString()}`
            : "Read"
        }
      >
        <CheckCheck size={14} />
      </span>
    );
  }

  return null;
}