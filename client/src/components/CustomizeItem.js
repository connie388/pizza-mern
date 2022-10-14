import React, { useState, useEffect } from "react";
import "../styles/collapsible.css";
import Toppings from "./Toppings";
import { Collapsible } from "../util/Collapsible";
import { RadioButton } from "../util/RadioButton";
import DisplayImageList from "./DisplayImageList";
import { sauces } from "../data/sauces";
// import { addons } from "../data/addons";
import { cheese } from "../data/cheese";
const axios = require("axios").default;

function CustomizeItem({ order, setOrder, currentData, setCurrentData }) {
  const [toppings, setToppings] = useState();
  const [cheeseType, setCheeseType] = useState();
  const [sauceType, setSauceType] = useState();
  const [amountType, setAmountType] = useState();

  const [selectedDough, setSelectedDough] = useState();
  const [selectedCrust, setSelectedCrust] = useState();
  const [selectedCook, setSelectedCook] = useState();
  const [preOrder, setPreOrder] = useState({
    size: currentData.type[0].size,
    amount: currentData.type[0].amount,
    information: currentData.type[0].information,
  });

  const [checkedState, setCheckedState] = useState(
    Array.from({ length: 10 }, () => Array.from({ length: 100 }, () => false))
  );

  useEffect(() => {
    axios
      .get(`http://localhost:4000/pizza/v1.0.0/order/toppings`)
      .then(function (response) {
        setToppings(response.data.toppings);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    axios
      .get(`http://localhost:4000/pizza/v1.0.0/order/sauce`)
      .then(function (response) {
        // console.log("response=" + JSON.stringify(response.data.sauce));
        setSauceType(response.data.sauce);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    axios
      .get(`http://localhost:4000/pizza/v1.0.0/order/sauce-amount`)
      .then(function (response) {
        // console.log("response=" + JSON.stringify(response.data.sauce));
        setAmountType(response.data.sauce);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    axios
      .get(`http://localhost:4000/pizza/v1.0.0/order/cheese`)
      .then(function (response) {
        // console.log("response=" + JSON.stringify(response.data.cheese));
        setCheeseType(response.data.cheese);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  function getToppings() {
    let addOnList = [];

    for (var j = 0; j < toppings?.length; j++) {
      let addon = toppings[j];
      var checkboxes = document.getElementsByName("000" + "-" + addon.category);
      if (checkboxes && checkboxes.length > 0) {
        let list = [];
        for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked) {
            list.push(checkboxes[i].value);
          }
        }

        if (list.length > 0) {
          let listData = {
            name: addon.category,
            price: addon.price,
            list: list,
          };
          addOnList.push(listData);
        }
      }
    }
    return addOnList;
  }

  function onSubmit() {
    let toppings = getToppings();

    let thisOrder = {
      ...preOrder,
      name: currentData.name,
      description: currentData.description,
      calory: currentData.calory,
      toppings: toppings,
    };

    // var ele = document.getElementsByTagName("input");
    // for (let i = 0; i < ele.length; i++) {
    //   if (ele[i].type === "radio") {
    //     if (
    //       ele[i].checked &&
    //       ele[i].name !== "sauce" &&
    //       ele[i].name !== "cheese"
    //     ) {
    //       let data = thisOrder;
    //       thisOrder = { ...data, [ele[i].name]: ele[i].value };
    //     }
    //   }
    // }

    let previousOrder = order;
    setOrder([...previousOrder, thisOrder]);
  }

  function onChange(e, name) {
    let data = { ...preOrder, [name]: e.target.value };
    setPreOrder(data);
  }

  return (
    <div className="customize-parent-container">
      <div className="inline m-3">
        {currentData.image ? (
          <img
            className="customize-image"
            src={currentData.image}
            alt={currentData.name}
          />
        ) : (
          <></>
        )}
        <div>
          <h5>{currentData.name}</h5>
          <h6>{currentData.description}</h6>
        </div>
      </div>
      <div className="inline">
        {currentData.type?.map((record, idx) => {
          return (
            <div key={idx} className="detail-section">
              <div
                id={record.shape}
                className={
                  preOrder.size === record.size ? "selected" : "not-selected"
                }
                onClick={(e) => {
                  let data = {
                    ...preOrder,
                    size: record.size,
                    amount: record.amount,
                    information: record.information,
                  };
                  setPreOrder(data);
                }}
              >
                {record.size}
              </div>
              <div className="text-center small-font weight-semi-bold">
                {record.information}
              </div>
            </div>
          );
        })}
      </div>

      <Collapsible
        id="collapseDoughButton"
        target="#collapseDough"
        control="collapseDough"
        label="CHOOSE YOUR DOUGH"
        chosenId="chosen-dough"
      >
        <RadioButton
          index="regular-dough"
          name="dough"
          id="regular-dough"
          label="Regular"
          value="Regular Dough"
          selected={selectedDough}
          onChange={(e) => {
            onChange(e, "dough");
            setSelectedDough("Regular Dough");
          }}
        />
        <RadioButton
          index="whole-wheat"
          name="dough"
          id="whole-wheat"
          label="Whole Wheat"
          value="Whole Wheat"
          selected={selectedDough}
          onChange={(e) => {
            onChange(e, "dough");
            setSelectedDough("Whole Wheat");
          }}
        />
      </Collapsible>
      <Collapsible
        id="collapseCrustButton"
        target="#collapseCrust"
        control="collapseCrust"
        label="CHOOSE YOUR CRUST"
        chosenId="chosen-crust"
      >
        <RadioButton
          index="regular-crust"
          name="crust"
          id="regular-crust"
          label="Regular"
          value="Regular Crust"
          selected={selectedCrust}
          onChange={(e) => {
            onChange(e, "crust");
            setSelectedCrust("Regular Crust");
          }}
        />
        <RadioButton
          index="thin-crust"
          name="crust"
          id="thin-crust"
          label="Thin"
          value="Thin Crust"
          selected={selectedCrust}
          onChange={(e) => {
            onChange(e, "crust");
            setSelectedCrust("Thin Crust");
          }}
        />
        <RadioButton
          index="thick-crust"
          name="crust"
          id="thick-crust"
          label="Thick"
          value="Thick Crust"
          selected={selectedCrust}
          onChange={(e) => {
            onChange(e, "crust");
            setSelectedCrust("Thick Crust");
          }}
        />
      </Collapsible>
      <Collapsible
        id="collapseSauceButton"
        target="#collapseSauce"
        control="collapseSauce"
        label="CHOOSE YOUR SAUCE"
        chosenId="chosen-sauce"
      >
        <DisplayImageList
          dataList={sauceType}
          radioButtonGroupName="sauce-group"
          material="sauce"
          preOrder={preOrder}
          setPreOrder={setPreOrder}
          amountTypeList={amountType}
        />
      </Collapsible>
      <Collapsible
        id="collapseCheeseButton"
        target="#collapseCheese"
        control="collapseCheese"
        label="MOZZARELLA CHEESE"
        chosenId="chosen-cheese"
      >
        <DisplayImageList
          dataList={cheeseType}
          radioButtonGroupName="cheese-group"
          material="cheese"
          preOrder={preOrder}
          setPreOrder={setPreOrder}
          amountTypeList={amountType}
        />
      </Collapsible>
      <Collapsible
        id="collapseToppingsButton"
        target="#collapseToppings"
        control="collapseToppings"
        label="CHOOSE YOUR TOPPINGS"
        chosenId="chosen-topping"
      >
        <div className="customize-toppings">
          <Toppings
            recordNo="000"
            checkedState={checkedState}
            setCheckedState={setCheckedState}
            toppings={toppings}
          />
        </div>
      </Collapsible>
      <Collapsible
        id="collapseCookingButton"
        target="#collapseCooking"
        control="collapseCooking"
        label="WELL DONE or REGULAR"
        chosenId="chosen-cooking"
      >
        <RadioButton
          index="regular-cook"
          name="cook"
          id="regular-cook"
          label="Regular"
          value="Regular Done"
          selected={selectedCook}
          onChange={(e) => {
            onChange(e, "cook");
            setSelectedCook("Regular Done");
          }}
        />
        <RadioButton
          index="well-done"
          name="cook"
          id="well-done"
          label="Well Done"
          value="Well Done"
          selected={selectedCook}
          onChange={(e) => {
            onChange(e, "cook");
            setSelectedCook("Well Done");
          }}
        />
      </Collapsible>
      <button
        id="select-button"
        type="submit"
        onClick={onSubmit}
        className="select-button"
      >
        ADD TO CART
      </button>
    </div>
  );
}

export default CustomizeItem;
