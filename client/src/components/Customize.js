import React from "react";
import "../styles/image-button.css";
function Customize({
  customize,
  setItem,
  image,
  alt,
  setCurrentData,
  data,
  children,
}) {
  const customizeItem = () => {
    setCurrentData(data);
    setItem("customize");
  };

  return (
    <div>
      {customize ? (
        <div
          className="image-container"
          onClick={(e) => {
            customizeItem();
          }}
        >
          <img
            className="customize-menu-image menu-image"
            src={image}
            alt={alt}
          />
          <p className="customize regular-font weight-light">Customize</p>
          {children}
        </div>
      ) : (
        <div className="image-container context-menu">
          <img className="menu-image" src={image} alt={alt} />
          <div className="context-menu">{children}</div>
        </div>
      )}
    </div>
  );
}

export default Customize;
