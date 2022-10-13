import React, { useEffect, useState } from "react";
import "../styles/app.css";
import "../styles/ribbon-corner.css";
import "../styles/image-button.css";
import Modal from "../util/Modal";
import Toppings from "./Toppings";
import Customize from "./Customize";
import orderItem from "../util/orderItem";
import SelectList from "../util/SelectList";
const axios = require("axios").default;

function Menu({ item, setItem, order, setOrder, currentData, setCurrentData }) {
  const [menu, setMenu] = useState();
  const [toppings, setToppings] = useState();

  const [show, setShow] = useState(false); // for Modal
  const [selected, setSelected] = useState([]);
  // select list's choices
  const [itemNo, setItemNo] = useState(-1); // keep track of the record no that open the modal
  const [canChoose, setCanChoose] = useState([]);

  const [checkedState, setCheckedState] = useState(
    Array.from({ length: 10 }, () =>
      Array.from({ length: 100 }, () => false)
    )
  );

  const showModal = (recordNo, data, canChooseItems) => {
    setShow(true);
    setItemNo(recordNo);
    setCurrentData(data);

    let findItems = toppings.filter((d, i) => {
      return canChooseItems.includes(d.id);
    });

    setCanChoose(findItems);
    // console.log("find items = " + JSON.stringify(findItems));
  };

  const onSubmitModal = () => {
    // orderItem(itemNo, currentData);
    orderItem(itemNo, currentData, setCurrentData, order, setOrder, toppings);
    hideModal();
  };

  const hideModal = () => {
    setShow(false);
    setItemNo(-1);

    if (toppings) {
      for (var j = 0; j < toppings.length; j++) {
        var checkboxes = document.getElementsByName(toppings[j].name);
        if (checkboxes && checkboxes.length > 0) {
          for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
          }
        }
      }
    }
    let arr = Array.from({ length: toppings.length }, () =>
      Array.from({ length: 100 }, () => false)
    );

    setCheckedState(arr);
  };

  useEffect(() => {
    setSelected([]);
    axios
      .get(`http://localhost:4000/pizza/v1.0.0/order/menu?category=${item}`)
      .then(function (response) {
        setMenu(response.data.menu);
      })
      .catch(function (error) {
        setMenu(null);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [item]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/pizza/v1.0.0/order/toppings`)
      .then(function (response) {
        // handle success
        // console.log(response.data.toppings);
        // console.log("item =" + item);
        setToppings(response.data.toppings);
        // console.log(JSON.stringify(menu));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);
  const getJson = () => {
    // let json = {};
    // switch (item) {
    //   case "pizzas":
    //     json = menuItems.pizzas;
    //     break;
    //   case "sandwiches":
    //     json = menuItems.sandwiches;
    //     break;
    //   case "pastas":
    //     json = menuItems.pastas;
    //     break;
    //   case "sides":
    //     json = menuItems.sides;
    //     break;
    //   case "drink":
    //     json = menuItems.drink;
    //     break;
    //   default:
    //     json = menuItems.pizzas;
    // }
    // return json;
    return menu;
  };

  function onSelectChange(event, recordNo) {
    let copy = [...selected];
    copy[recordNo] = event.target.value;
    setSelected(copy); // update the state of select list

    // let selectElement = document.querySelector("#myList" + recordNo);
    // let output = selectElement.value;
    // document.querySelector("#select-button" + recordNo).textContent =
    //   "ADD $" + output;
  }

  return (
    <div className="box">
      {getJson()?.map((data, recordNo) => {
        return (
          <div key={recordNo} className="menu-container parent">
            {data.hasOwnProperty("new") && data.new ? (
              <div className="ribbon regular-font font-weight-light">New</div>
            ) : (
              <></>
            )}
            <Customize
              customize={data.customize}
              setItem={setItem}
              image={data.image}
              alt={data.name}
              setCurrentData={setCurrentData}
              data={data}
            >
              <div className={data.customize ? "item" : "item  context-menu"}>
                <div id="data-name" className="item-name">
                  {data.name}
                </div>
                <div
                  id="data-calory"
                  className="regular-font font-weight-light"
                >
                  {data.calory}
                </div>
                <div
                  id="data-description"
                  className="item-desc regular-font font-weight-light item-desc"
                >
                  {data.description}
                </div>
              </div>
            </Customize>
            <div>
              {data.addons.length > 0 ? (
                <a
                  href="#"
                  className="regular-font font-weight-light"
                  onClick={(e) => {
                    showModal(recordNo, data, data.addons);
                    // console.log("addon=" + JSON.stringify(data.addons));
                  }}
                >
                  Addons +
                </a>
              ) : (
                <></>
              )}
            </div>

            {data.addons ? (
              <Modal
                show={show}
                handleClose={hideModal}
                title="CHOOSE ADDONS"
                subtitle={"For " + currentData?.name}
                onSubmit={(e) => onSubmitModal()}
              >
                <Toppings
                  recordNo={recordNo}
                  checkedState={checkedState}
                  toppings={canChoose}
                  setCheckedState={setCheckedState}
                />
              </Modal>
            ) : (
              <></>
            )}
            {data.hasOwnProperty("type") && data.type.length > 0 ? (
              <SelectList
                id={"myList" + recordNo}
                recordNo={recordNo}
                value={selected[recordNo]}
                onSelectChange={onSelectChange}
                classNm="dropdown"
              >
                {data.type.map((record, idx) => {
                  return (
                    <option key={idx} value={record.amount}>
                      {record.size} {record.information}
                    </option>
                  );
                })}
              </SelectList>
            ) : (
              <></>
            )}
            {data.hasOwnProperty("choice") && data.choice.length > 0 ? (
              <SelectList
                id={"myList" + recordNo}
                recordNo={recordNo}
                value={selected[recordNo]}
                onSelectChange={onSelectChange}
                classNm="dropdown"
              >
                {data.choice.map((record, idx) => {
                  return (
                    <option key={idx} value={record.amount}>
                      {record.size} {record.information}
                    </option>
                  );
                })}
              </SelectList>
            ) : (
              <></>
            )}
            <button
              id={"select-button" + recordNo}
              type="submit"
              onClick={(e) => {
                orderItem(
                  recordNo,
                  data,
                  setCurrentData,
                  order,
                  setOrder,
                  toppings
                );
              }}
              className="select-button"
            >
              ADD TO CART
              {/* ADD
              {data.hasOwnProperty("type") ? data.type[0].amount : data.amount} */}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Menu;
