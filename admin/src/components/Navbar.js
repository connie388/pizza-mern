import React from "react";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../util/DataProvider";

function Navbar() {
  const [item, setItem, action, setAction] = useContext(DataContext);

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
      <nav>
        <a
          href="#"
          className={item === "cheese" ? "active" : "navitem"}
          onClick={() => changeActiveItem("cheese")}
        >
          Cheese Type
        </a>
        <a
          href="#"
          className={item === "sauce" ? "active" : "navitem"}
          onClick={() => changeActiveItem("sauce")}
        >
          Sauce Type
        </a>
        <a
          href="#"
          className={item === "sauceamount" ? "active" : "navitem"}
          onClick={() => changeActiveItem("sauceamount")}
        >
          Sauce Amount Type
        </a>
        <a
          href="#"
          className={item === "menucategory" ? "active" : "navitem"}
          onClick={() => changeActiveItem("menucategory")}
        >
          Menu Category
        </a>
        <div className="topnav-right">
          <NavLink
            className={action === "create" ? "blue" : "non-active"}
            onClick={() => setAction("create")}
            to="/create"
          >
            Create Record
          </NavLink>
          <NavLink
            className={action === "list" ? "blue" : "non-active"}
            onClick={() => setAction("list")}
            to="/"
          >
            Record List
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
