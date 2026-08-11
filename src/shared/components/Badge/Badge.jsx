import "./Badge.css";

export default function Badge({
  children,
  variant = "primary",
  size = "md",
  rounded = true
}) {
  return (
    <span
      className={`badge badge-${variant} badge-${size} ${
        rounded ? "badge-rounded" : ""
      }`}
    >
      {children}
    </span>
  );
}