import React, { useState } from "react";
import { RadioButton } from "../util/RadioButton";

function DisplayImageList({
  dataList,
  radioButtonGroupName,
  material,
  preOrder,
  setPreOrder,
}) {
  const [selected, setSelected] = useState("");

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
                  {data.type ? (
                    <div className="inline">
                      {data.type.map((type, index) => {
                        return (
                          <p key={index} className="small-font weight-light">
                            <RadioButton
                              border="false"
                              index={index}
                              name={radioButtonGroupName}
                              id={type}
                              label={type}
                              value={type}
                              class="none"
                              onChange={(e) => {
                                setSelected(data.name);
                                let value =
                                  data.name +
                                  " (" +
                                  e.currentTarget.value +
                                  ")";
                                let previousPreOrder = preOrder;
                                setPreOrder({
                                  ...previousPreOrder,
                                  [material]: value,
                                });
                              }}
                            />
                          </p>
                        );
                      })}
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
