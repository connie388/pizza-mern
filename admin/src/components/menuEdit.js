import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import useForm from "../util/useForm";
import { TextField } from "../util/TextField";
import { useContext } from "react";
import { DataContext } from "../util/DataProvider";

export default function MenuEdit() {
  const { handleChange, inputs, setInputs, errors } = useForm({});
  const [item, setItem, action, setAction] = useContext(DataContext);
  const params = useParams();
  const navigate = useNavigate();
  const [menuCategory, setMenuCategory] = useState("");
  const [list, setList] = useState(null);
  const [toppings, setToppings] = useState([]);
  const [checked, setChecked] = useState({});

  function checkboxOnChange(name, e) {
    let checklist = checked;
    let checkValue = !checked[name];
    checklist = { ...checklist, [name]: checkValue };
    setChecked(checklist);

    let copy = toppings;
    let index = copy.indexOf(e.target.value);
    if (index === -1) {
      copy.push(e.target.value);
    } else {
      copy.splice(index, 1);
    }

    setToppings(copy);
  }

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();

      const response = await axios.get(
        `http://localhost:4000/pizza/v1.0.0/order/${item}/"${params.id.toString()}"`
      );

      if (!response.data?.success) {
        const message = `An error has occurred: ${response.message}`;
        window.alert(message);
        return;
      }

      const record = response.data[item][0];
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        setAction("list");
        navigate("/menu");
        return;
      }

      setMenuCategory(record["category"]["category"]);
      setInputs({
        name: record["name"],
        customize: record["customize"],
        new: record["new"],
        addons: record["addons"],
        calory: record["calory"],
        amount: record["amount"],
        image: record["image"],
        description: record["description"],
      });
      let temp = [];

      let list = {};
      for (var i = 0; i < record["addons"]?.length; i++) {
        list = { ...list, [record["addons"][i].category]: true };
        temp.push(record["addons"][i]._id);
      }
      setChecked(list);
      setToppings(temp);
    }

    async function getToppingCategory() {
      const data = await axios.get(
        "http://localhost:4000/pizza/v1.0.0/order/toppingcategory"
      );

      const option = data.data?.toppingcategory.map((item) => ({
        value: item._id,
        label: item.category,
      }));
      setList(option);

      let list = {};
      for (var i = 0; i < data.data?.toppingcategory.length; i++) {
        list = { ...list, [data.data?.toppingcategory[i].category]: false };
      }
      setChecked(list);
    }

    getToppingCategory();
    fetchData();

    return;
  }, [params.id, item, setInputs, setAction, navigate]);

  async function onSubmit(e) {
    e.preventDefault();

    const newRecord = { ...inputs, addons: toppings };
    // This will send a post request to update the data in the database.
    try {
      await axios.put(
        `http://localhost:4000/pizza/v1.0.0/order/${item}/"${params.id.toString()}"`,
        newRecord
      );
    } catch (err) {
      window.alert(err.message || "An error has occurred.");
      return;
    }
    setAction("list");
    navigate("/menu");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div className="m-5">
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>Menu Category {menuCategory}</label>
          <div>
            <TextField
              name="name"
              label="Name"
              type="text"
              onChange={handleChange}
              id="name"
              value={inputs["name"]}
              required
            />
            {errors["name"] && (
              <div role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                {errors["name"]}
              </div>
            )}
            <TextField
              name="customize"
              label="Customize"
              type="checkbox"
              onChange={handleChange}
              id="customize"
              value={inputs["customize"]}
            />
            {errors["customize"] && (
              <div role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                {errors["customize"]}
              </div>
            )}
            <TextField
              name="new"
              label="New Item"
              type="checkbox"
              onChange={handleChange}
              id="new"
              value={inputs["new"]}
            />
            {errors["new"] && (
              <div role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                {errors["new"]}
              </div>
            )}
            <TextField
              name="calory"
              label="Calory"
              type="text"
              onChange={handleChange}
              id="calory"
              value={inputs["calory"]}
            />
            {errors["calory"] && (
              <div role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                {errors["calory"]}
              </div>
            )}
            <TextField
              name="amount"
              label="Amount"
              type="number"
              onChange={handleChange}
              id="amount"
              value={inputs["amount"]}
            />
            {errors["amount"] && (
              <div role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                {errors["amount"]}
              </div>
            )}
            <TextField
              name="image"
              label="Image URL"
              type="text"
              onChange={handleChange}
              id="image"
              value={inputs["image"]}
            />
            {errors["image"] && (
              <div role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                {errors["image"]}
              </div>
            )}
            <TextField
              name="description"
              label="Description"
              type="text"
              onChange={handleChange}
              id="description"
              value={inputs["description"]}
              required
            />
            {errors["description"] && (
              <div role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                {errors["description"]}
              </div>
            )}
          </div>
          <label>Toppings Choice:</label>
          {list?.map((option, index) => {
            return (
              <div
                className="inline-category"
                key={`checkbox_list_${index + 1}`}
              >
                <label className="data" htmlFor={option.label}>
                  {option.label}
                </label>
                <input
                  className="data"
                  type="checkbox"
                  name={option.label}
                  value={option.value}
                  checked={checked[option.label]}
                  onChange={(e) => checkboxOnChange(option.label, e)}
                />
              </div>
            );
          })}

          {errors["information"] && (
            <div role="alert" style={{ color: "rgb(255, 0, 0)" }}>
              {errors["information"]}
            </div>
          )}
        </div>

        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
