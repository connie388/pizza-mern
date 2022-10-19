import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useForm from "../util/useForm";
import { TextField } from "../util/TextField";
import { documents } from "../data/documents";
import { useContext } from "react";
import { DataContext } from "../util/DataProvider";
import "../styles/app.css";

export default function MenuChoiceCreate() {
  const { handleChange, inputs, setInputs, errors } = useForm({});
  const [item, setItem, action, setAction] = useContext(DataContext);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    async function getMenu() {
      const data = await axios.get(
        "http://localhost:4000/pizza/v1.0.0/order/menu"
      );

      const option = data.data?.menu.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setOptions(option);
      setInputs({ ...inputs, menu: option[0].value });
    }
    getMenu();
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
    navigate("/menuchoice");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div className="m-5">
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="menu">Menu</label>
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
            name="size"
            label="Size"
            type="text"
            onChange={handleChange}
            id="size"
            value={inputs["size"]}
            required
          />
          {errors["size"] && (
            <div role="alert" style={{ color: "rgb(255, 0, 0)" }}>
              {errors["size"]}
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
            name="information"
            label="information"
            type="text"
            onChange={handleChange}
            id="information"
            value={inputs["information"]}
          />
          {errors["information"] && (
            <div role="alert" style={{ color: "rgb(255, 0, 0)" }}>
              {errors["information"]}
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
