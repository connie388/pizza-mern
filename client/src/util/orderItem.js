import React from "react";
// import { addons } from "../data/addons";

function orderItem(recordNo, data, setCurrentData, order, setOrder, toppings) {
  setCurrentData(data);

  let addOnList = [];

  for (var j = 0; j < toppings?.length; j++) {
    let addon = toppings[j];
    var checkboxes = document.getElementsByName(
      recordNo + "-" + addon.category
    );
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

  let record = [];
  record.push({
    name: data.name,
    calory: data.calory,
    description: data.description,
    toppings: addOnList,
  });

  if (data.amount) {
    record[0].amount = data.amount;
  }

  if (data.type && data.type.length > 0) {
    var select = document.getElementById("myList" + recordNo);
    let index = select.selectedIndex;

    record[0].size = data.type[index].size;
    if (data.type[index].amount) record[0].amount = data.type[index].amount;
    record[0].information = data.type[index].information;
  }

  if (data.choice && data.choice.length > 0) {
    var choiceSelect = document.getElementById("myList" + recordNo);
    let index = choiceSelect.selectedIndex;

    record[0].size = data.choice[index].size;
    if (data.choice[index].amount) record[0].amount = data.choice[index].amount;
    record[0].information = data.choice[index].information;
  }
  setOrder([...order, record[0]]);
}

export default orderItem;
