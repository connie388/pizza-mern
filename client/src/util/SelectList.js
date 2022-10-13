import React, { useEffect, useState } from "react";

function SelectList({
  id,
  classNm,
  recordNo,
  value,
  onSelectChange,
  children,
}) {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (onSelectChange && recordNo) onSelectChange(event, recordNo);
  };

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <select
      id={id}
      className={classNm}
      value={selectedValue}
      onChange={(event) => {
        handleChange(event);
      }}
    >
      {children}
    </select>
  );
}

export default SelectList;
