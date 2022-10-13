import React from "react";

function Toppings({ recordNo, checkedState, toppings, setCheckedState }) {
  const handleOnChange = (row, column, event) => {
    let copy = [...checkedState];
    copy[row][column] = event.target.checked;
    setCheckedState(copy);
  };

  return (
    <div>
      {toppings?.map((addon, index) => {
        return (
          <div key={"type" + addon.name}>
            <label
              id={"type" + addon.name}
              className="regular-font font-weight-bold green"
            >
              {addon.name.toUpperCase() + " TOPPINGS"}
            </label>
            {addon.list.map((list, j) => {
              return (
                <div className="inline" key={addon.name + j}>
                  <input
                    type="checkbox"
                    id={recordNo + "checkbox-" + addon.name + j}
                    name={recordNo + "-" + addon.name}
                    value={list}
                    checked={checkedState[index][j]}
                    onChange={(e) => handleOnChange(index, j, e)}
                  />
                  <label
                    htmlFor={recordNo + "checkbox-" + addon.name + j}
                    className="regular-font weight-light"
                  >
                    {list}
                  </label>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Toppings;
