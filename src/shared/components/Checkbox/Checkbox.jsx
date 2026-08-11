import "./Checkbox.css";

export default function Checkbox({
  label,
  checked = false,
  disabled = false,
  onChange,
  name,
  value
}) {
  return (
    <label className="checkbox">

      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        name={name}
        value={value}
      />

      <span className="checkbox__mark"></span>

      {label && (
        <span className="checkbox__label">
          {label}
        </span>
      )}

    </label>
  );
}