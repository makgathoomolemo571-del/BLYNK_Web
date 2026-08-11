import "./TextArea.css";

const TextArea = ({
  label,
  error,
  ...props
}) => {

  return (

    <div className="textarea-group">

      {label && (
        <label>{label}</label>
      )}

      <textarea
        className={`textarea ${
          error ? "error" : ""
        }`}
        {...props}
      />

      {error && (
        <small>{error}</small>
      )}

    </div>

  );

};

export default TextArea;