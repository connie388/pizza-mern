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
}) => {
  return (
    <>
      <label htmlFor={name}>
        {icon} {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        pattern={pattern}
        inputMode={inputMode}
        required
      />
    </>
  );
};
