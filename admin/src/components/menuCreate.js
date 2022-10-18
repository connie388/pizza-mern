import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useForm from "../util/useForm";
import { TextField } from "../util/TextField";
import { documents } from "../data/documents";
import { useContext } from "react";
import { DataContext } from "../util/DataProvider";
import "../styles/app.css";

export default function MenuCreate() {
  const { handleChange, inputs, setInputs, errors } = useForm({});
  const [item, setItem, action, setAction] = useContext(DataContext);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    async function getMenuCategory() {
      const data = await axios.get(
        "http://localhost:4000/pizza/v1.0.0/order/menucategory"
      );

      const option = data.data?.menucategory?.map((item) => ({
        value: item._id,
        label: item.category,
      }));
      setOptions(option);
      setInputs({ ...inputs, menu: option[0]?.value });
    }
    getMenuCategory();
  }, []);

  const navigate = useNavigate();

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newRecord = {
      ...inputs,
    };

    try {
      await axios.post(
        `http://localhost:4000/pizza/v1.0.0/order/${item}`,
        newRecord
      );
    } catch (err) {
      window.alert(err.message || "An error has occurred.");
      return;
    }

    documents[item]?.map((data, index) => {
      return setInputs((values) => ({ ...values, [data.name]: "" }));
    });

    setAction("list");
    navigate("/menu");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="menu">Menu Category</label>
        <select name="menu" value={inputs["menu"]} onChange={handleChange}>
          {options?.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>

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
            required
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
        <div className="form-group">
          <input type="submit" value="Add" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
