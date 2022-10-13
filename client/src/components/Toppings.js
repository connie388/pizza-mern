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
          <div key={"type" + addon.category}>
            <label
              id={"type" + addon.category}
              className="regular-font font-weight-bold green"
            >
              {addon.category.toUpperCase() + " TOPPINGS"}
            </label>
            {addon.list.map((thisToping, j) => {
              return (
                <div className="inline" key={addon.category + j}>
                  <input
                    type="checkbox"
                    id={recordNo + "checkbox-" + addon.category + j}
                    name={recordNo + "-" + addon.category}
                    value={thisToping.topping}
                    checked={checkedState[index][j]}
                    onChange={(e) => handleOnChange(index, j, e)}
                  />
                  <label
                    htmlFor={recordNo + "checkbox-" + addon.category + j}
                    className="regular-font weight-light"
                  >
                    {thisToping.topping}
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
