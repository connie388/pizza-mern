import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { documents } from "../data/documents";
import { useContext } from "react";
import { DataContext } from "../util/DataProvider";

const Record = (props) => (
  <tbody>
    <tr>
      {documents[props.item]?.map((data, index) => {
        return <td key={index}>{props.record[data.name]}</td>;
      })}
      <td>
        <NavLink className="btn btn-link" to={`/edit/${props.record._id}`}>
          Edit
        </NavLink>
      </td>
      <td>|</td>
      <td>
        <button
          className="btn btn-link"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  </tbody>
);

export default function RecordList() {
  const [item] = useContext(DataContext);
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      let response = await axios.get(
        `http://localhost:4000/pizza/v1.0.0/order/${item}`
      );

      if (!response.data?.success) {
        const message = `An error occurred: ${response.data.message}`;
        window.alert(message);
        return;
      }

      setRecords(response.data[item]);
    }

    getRecords();

    return;
  }, [item]);

  // This method will delete a record
  async function deleteRecord(id) {
    await axios.delete(
      `http://localhost:4000/pizza/v1.0.0/order/${item}/"${id}"`
    );

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records?.map((record) => {
      return (
        <Record
          item={item}
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            {documents[item]?.map((data, index) => {
              return <th key={index}>{data.label}</th>;
            })}
          </tr>
        </thead>
        {recordList()}
      </table>
    </div>
  );
}
