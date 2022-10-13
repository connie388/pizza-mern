import React, { useEffect, useState } from "react";
import "../styles/app.css";
import "../styles/ribbon-corner.css";
import "../styles/image-button.css";
import Modal from "../util/Modal";
import Toppings from "./Toppings";
import Customize from "./Customize";
import { menuItems } from "../data/menuItems";
import { addons } from "../data/addons";
import orderItem from "../util/orderItem";
import SelectList from "../util/SelectList";

function Menu({ item, setItem, order, setOrder, currentData, setCurrentData }) {
  const [show, setShow] = useState(false); // for Modal
  const [selected, setSelected] = useState([]);
  // select list's choices
  const [itemNo, setItemNo] = useState(-1); // keep track of the record no that open the modal
  const [canChoose, setCanChoose] = useState([]);

  const [checkedState, setCheckedState] = useState(
    Array.from({ length: addons.type.length }, () =>
      Array.from({ length: 100 }, () => false)
    )
  );

  useEffect(() => {
    setSelected([]);
  }, [item]);

  const showModal = (recordNo, data, canChooseItems) => {
    setShow(true);
    setItemNo(recordNo);
    setCurrentData(data);
    let toppings = addons.type.filter((d, i) =>
      canChooseItems.includes(d.name)
    );
    setCanChoose(toppings);
  };

  const onSubmitModal = () => {
    // orderItem(itemNo, currentData);
    orderItem(itemNo, currentData, setCurrentData, order, setOrder);
    hideModal();
  };

  const hideModal = () => {
    setShow(false);
    setItemNo(-1);

    if (addons.type) {
      for (var j = 0; j < addons.type.length; j++) {
        var checkboxes = document.getElementsByName(addons.type[j].name);
        if (checkboxes && checkboxes.length > 0) {
          for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
          }
        }
      }
    }
    let arr = Array.from({ length: addons.type.length }, () =>
      Array.from({ length: 100 }, () => false)
    );

    setCheckedState(arr);
  };

  const getJson = () => {
    let json = {};
    switch (item) {
      case "pizzas":
        json = menuItems.pizzas;
        break;
      case "sandwiches":
        json = menuItems.sandwiches;
        break;
      case "pastas":
        json = menuItems.pastas;
        break;
      case "sides":
        json = menuItems.sides;
        break;
      case "drink":
        json = menuItems.drink;
        break;
      default:
        json = menuItems.pizzas;
    }
    return json;
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
                <div id="data-calory" className="regular-font font-weight-light">
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
              {data.addons ? (
                <a
                  href="#"
                  className="regular-font font-weight-light"
                  onClick={(e) => {
                    showModal(recordNo, data, data.addons);
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
            {data.hasOwnProperty("type") ? (
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
            <button
              id={"select-button" + recordNo}
              type="submit"
              onClick={(e) => {
                orderItem(recordNo, data, setCurrentData, order, setOrder);
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
