import React from "react";

export const Collapsible = ({
  id,
  target,
  control,
  label,
  chosenId,
  children,
}) => {
  return (
    <div >
      <div>
        <button
          id={id}
          className="menu-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={target}
          aria-expanded="false"
          aria-controls={control}
        >
          {label} <div id={chosenId}></div>
        </button>
      </div>
      <div className="collapse text-dark" id={control} aria-expanded="false">
        <div className="collapsible-container">{children}</div>
      </div>
    </div>
  );
};
