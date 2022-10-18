import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import useForm from "../util/useForm";
import { TextField } from "../util/TextField";
import { useContext } from "react";
import { DataContext } from "../util/DataProvider";

export default function ToppingsEdit() {
  const { handleChange, inputs, setInputs, errors } = useForm({});
  const [item, setItem, action, setAction] = useContext(DataContext);
  const params = useParams();
  const navigate = useNavigate();

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
        // setAction("list");
        navigate("/");
        return;
      }

      setInputs({ topping: record["topping"] });
    }

    fetchData();

    return;
  }, [params.id, item, setInputs, setAction, navigate]);

  async function onSubmit(e) {
    e.preventDefault();

    const newRecord = { ...inputs };
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
    navigate("/toppings");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
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
