import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useForm from "../util/useForm";
import { TextField } from "../util/TextField";
import { documents } from "../data/documents";
import { useContext } from "react";
import { DataContext } from "../util/DataProvider";
import "../styles/app.css";

export default function ToppingsCreate() {
  const { handleChange, inputs, setInputs, errors } = useForm({});
  const [item, setItem, action, setAction] = useContext(DataContext);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    async function getToppingCategory() {
      const data = await axios.get(
        "http://localhost:4000/pizza/v1.0.0/order/toppingcategory"
      );

      const option = data.data?.toppingcategory.map((item) => ({
        value: item._id,
        label: item.category + " $" + item.price,
      }));
      setOptions(option);
      setInputs({ ...inputs, category: option[0].value });
    }
    getToppingCategory();
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
    navigate("/toppings");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="category">Category</label>
        <select
          name="category"
          value={inputs["category"]}
          onChange={handleChange}
        >
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
            name="topping"
            label="Topping"
            type="text"
            onChange={handleChange}
            id="topping"
            value={inputs["topping"]}
            required
          />

          {errors["topping"] && (
            <div role="alert" style={{ color: "rgb(255, 0, 0)" }}>
              {errors["topping"]}
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
