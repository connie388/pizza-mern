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
        className={item === "pizzas" ? "active" : "navitem"}
        onClick={() => changeActiveItem("pizzas")}
      >
        Pizzas
      </a>
      <a
        href="#"
        className={item === "sandwiches" ? "active" : "navitem"}
        onClick={() => changeActiveItem("sandwiches")}
      >
        Sandwiches
      </a>
      <a
        href="#"
        className={item === "pastas" ? "active" : "navitem"}
        onClick={() => changeActiveItem("pastas")}
      >
        Pastas
      </a>
      <a
        href="#"
        className={item === "sides" ? "active" : "navitem"}
        onClick={() => changeActiveItem("sides")}
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
