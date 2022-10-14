import React, { useState } from "react";

function DisplayImageList({
  dataList,
  radioButtonGroupName,
  material,
  preOrder,
  setPreOrder,
  amountTypeList,
}) {
  const [selected, setSelected] = useState("");
  const [selectedRecord, setSelectedRecord] = useState("");

  function DisplayAmountList(data) {
    function onChanged(e) {
      setSelectedRecord(data.name + "|" + e.target.value);
      setSelected(data.name);
      let value = data.name + " (" + e.target.value + ")";
      let previousPreOrder = preOrder;
      setPreOrder({
        ...previousPreOrder,
        [material]: value,
      });
    }
    return amountTypeList?.map((record, index) => {
      return (
        <label key={index} className="small-font weight-light">
          <input
            type="radio"
            id={record.type}
            name={radioButtonGroupName}
            checked={selectedRecord === data.name + "|" + record.type}
            value={record.type}
            onChange={(e) => onChanged(e)}
          />
          {record.type}
        </label>
      );
    });
  }

  return (
    <div className="box">
      {dataList?.map((data, i) => {
        return (
          <div
            key={i}
            className={
              selected === data.name
                ? "sauce-box inline selected"
                : "sauce-box inline not-selected"
            }
            onClick={(e) => {
              setSelected(data.name);
              setSelectedRecord("");
              let previousPreOrder = preOrder;
              setPreOrder({ ...previousPreOrder, [material]: data.name });
            }}
          >
            {data.image ? (
              <img className="sauce-image" src={data.image} alt={data.name} />
            ) : (
              <></>
            )}
            <div>
              <div className="detail-section">
                <div className="large-font font-weight-bold">{data.name}</div>
                <div>
                  {data.amountType ? (
                    <div className="inline">
                      <DisplayAmountList name={data.name} />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DisplayImageList;
