import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useForm from "../util/useForm";
import { TextField } from "../util/TextField";
import { documents } from "../data/documents";
import { useContext } from "react";
import { DataContext } from "../util/DataProvider";

export default function Create() {
  const { handleChange, inputs, setInputs, errors } = useForm({});
  const [item, setAction] = useContext(DataContext);

  const navigate = useNavigate();

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newRecord = { ...inputs };

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
      setInputs((values) => ({ ...values, [data.name]: "" }));
    });

    // setAction("list");
    // navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        {documents[item]?.map((data, index) => {
          return (
            <div key={index}>
              {data.required ? (
                <TextField
                  name={data.name}
                  label={data.label}
                  type={data.type}
                  onChange={handleChange}
                  id={data.id}
                  value={inputs[data.name]}
                  required
                />
              ) : (
                <TextField
                  name={data.name}
                  label={data.label}
                  type={data.type}
                  onChange={handleChange}
                  id={data.id}
                  value={inputs[data.name]}
                />
              )}
              {errors[data.name] && (
                <div role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                  {errors[data.name]}
                </div>
              )}
            </div>
          );
        })}

        <div className="form-group">
          <input
            type="submit"
            value="Create record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
