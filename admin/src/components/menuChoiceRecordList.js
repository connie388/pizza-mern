import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { documents } from "../data/documents";
import { useContext } from "react";
import { DataContext } from "../util/DataProvider";

const MenuChoiceRecord = (props) => (
  <tbody>
    <tr>
      {documents[props.item]?.map((data, index) => {
        return typeof props.record[data.name] === "boolean" ? (
          <td key={`category_${index + 1}`}>
            {props.record[data.name] === true ? (
              <input type="checkbox" defaultChecked />
            ) : (
              <input type="checkbox" />
            )}
          </td>
        ) : data.type === "array" ? (
          <td key={`category_${index + 1}`}>
            <div>{props.record[data?.name]["name"]}</div>
          </td>
        ) : (
          <td key={`category_${index + 1}`}>{props.record[data?.name]}</td>
        );
      })}
      <td>
        <Link
          className="btn btn-link"
          to={`/edit/menuchoice/${props.record._id}`}
        >
          Edit
        </Link>
        |
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

export default function MenuChoiceRecordList() {
  const [item, setItem, action, setAction] = useContext(DataContext);
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
        <MenuChoiceRecord
          item={item}
          record={record}
          categoryId={record._id}
          deleteRecord={(categoryId, id) => deleteRecord(categoryId, id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Menu Choice Record List</h3>
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
