import React, { useState } from "react";
import "../styles/navbar.css";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../util/DataProvider";

function Navbar() {
  const [item, setItem, action, setAction] = useContext(DataContext);
  const [loc, setLoc] = useState("/");

  const changeActiveItem = (itemName) => {
    setItem(itemName);
    if (
      itemName === "toppings" ||
      itemName === "menuchoicebycategory" ||
      itemName === "menuchoice"
    ) {
      setLoc(`/${itemName}`);
    }
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
        <Link
          to="/"
          onClick={() => changeActiveItem("cheese")}
          className={item === "cheese" ? "active" : "navitem"}
        >
          Cheese Type
        </Link>
        <Link
          to="/"
          onClick={() => changeActiveItem("sauce")}
          className={item === "sauce" ? "active" : "navitem"}
        >
          Sauce Type
        </Link>
        <Link
          to="/"
          onClick={() => changeActiveItem("sauceamount")}
          className={item === "sauceamount" ? "active" : "navitem"}
        >
          Sauce Amount Type
        </Link>
        <Link
          to="/"
          onClick={() => changeActiveItem("menucategory")}
          className={item === "menucategory" ? "active" : "navitem"}
        >
          Menu Category
        </Link>
        <Link
          to="/"
          onClick={() => changeActiveItem("toppingcategory")}
          className={item === "toppingcategory" ? "active" : "navitem"}
        >
          Topping Category
        </Link>
        <Link
          to="/toppings"
          onClick={() => changeActiveItem("toppings")}
          className={item === "toppings" ? "active" : "navitem"}
        >
          Toppings
        </Link>
        <Link
          to="/menuchoicebycategory"
          onClick={() => changeActiveItem("menuchoicebycategory")}
          className={item === "menuchoicebycategory" ? "active" : "navitem"}
        >
          Menu Choice by Category
        </Link>
        <Link
          to="/menuchoice"
          onClick={() => changeActiveItem("menuchoice")}
          className={item === "menuchoice" ? "active" : "navitem"}
        >
          Menu Choice
        </Link>
        <div className="topnav-right">
          <NavLink
            className={action === "create" ? "blue" : "non-active"}
            onClick={() => setAction("create")}
            to={`/create${loc}`}
          >
            Create Record
          </NavLink>
          <NavLink
            className={action === "list" ? "blue" : "non-active"}
            onClick={() => setAction("list")}
            to={`${loc}`}
          >
            Record List
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
