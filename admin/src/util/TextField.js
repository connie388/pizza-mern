export const TextField = ({
  name,
  icon,
  label,
  type,
  onChange,
  id,
  value,
  placeholder,
  pattern,
  inputMode,
  required,
}) => {
  return (
    <div>
      <label htmlFor={name}>
        {icon} {label}
      </label>
      {required ? (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
          pattern={pattern}
          inputMode={inputMode}
          checked={value === true ? "checked" : ""}
          required
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
          pattern={pattern}
          inputMode={inputMode}
          checked={value === true? "checked":""}
        />
      )}
    </div>
  );
};
