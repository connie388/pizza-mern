export const CheckBox = ({ name, label, value, onChange }) => {
  return (
    <label>
      <input name={name} type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};
