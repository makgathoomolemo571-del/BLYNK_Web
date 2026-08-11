import "./ErrorMessage.css";

export default function ErrorMessage({
  message
}) {

  if (!message) return null;

  return (
    <small className="error-message">
      {message}
    </small>
  );

}