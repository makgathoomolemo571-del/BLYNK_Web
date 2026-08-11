import "./Empty.css";

export default function Empty({
  title = "Nothing here",
  message = "No data available."
}) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}