import "../styles/radioButton.css";

export const RadioButton = ({
  border,
  index,
  name,
  id,
  label,
  value,
  onChange,
  selected,
}) => {
  return (
    <label
      key={index}
      className={`${
        border
          ? "radio-no-border"
          : selected === value
          ? "radio-border selected"
          : "radio-border not-selected"
      }`}
    >
      <input
        key={index}
        name={name}
        id={id}
        type="radio"
        value={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};
