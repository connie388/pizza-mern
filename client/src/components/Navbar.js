import React from "react";
import "../styles/navbar.css";

function Navbar({ item, setItem }) {
  const changeActiveItem = (itemName) => {
    setItem(itemName);
  };

  function toggleIcon() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  return (
    <div className="topnav" id="myTopnav">
      {/* <a
        href="#"
        className={item === "home" ? "active" : "navitem"}
        onClick={() => changeActiveItem("home")}
      >
        Home
      </a> */}
      <a
        href="#"
        className={item === "pizza" ? "active" : "navitem"}
        onClick={() => changeActiveItem("pizza")}
      >
        Pizzas
      </a>
      <a
        href="#"
        className={item === "sandwich" ? "active" : "navitem"}
        onClick={() => changeActiveItem("sandwich")}
      >
        Sandwiches
      </a>
      <a
        href="#"
        className={item === "pasta" ? "active" : "navitem"}
        onClick={() => changeActiveItem("pasta")}
      >
        Pastas
      </a>
      <a
        href="#"
        className={item === "side" ? "active" : "navitem"}
        onClick={() => changeActiveItem("side")}
      >
        Sides
      </a>
      {/* <a
        href="#"
        className={item === "desserts" ? "active" : "navitem"}
        onClick={() => changeActiveItem("desserts")}
      >
        Desserts
      </a> */}
      <a
        href="#"
        name="drink"
        className={item === "drink" ? "active" : "navitem"}
        onClick={() => changeActiveItem("drink")}
      >
        Drinks
      </a>
      <a href="#" className="icon" onClick={toggleIcon}>
        <i className="fa fa-bars"></i>
      </a>
    </div>
  );
}

export default Navbar;
