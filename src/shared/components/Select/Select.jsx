import "./Select.css";

export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  disabled = false
}) {
  return (
    <div className="select-group">

      {label && (
        <label className="select-label">
          {label}
        </label>
      )}

      <select
        className={`select ${error ? "select-error" : ""}`}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >

        {options.map(option => (

          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>

        ))}

      </select>

      {error && (
        <small className="select-error-text">
          {error}
        </small>
      )}

    </div>
  );
}