import React, { useState } from "react";
import Menu from "./Menu";
import Basket from "./Basket";
import CustomizeItem from "./CustomizeItem";

function Order({ item, setItem, order, setOrder, total, setTotal }) {
  const [currentData, setCurrentData] = useState();
  return (
    <>
      {item === "customize" ? (
        <div className="row">
          <CustomizeItem
            order={order}
            setOrder={setOrder}
            currentData={currentData}
            setCurrentData={setCurrentData}
          />
          <div className="checkout">
            <Basket
              order={order}
              setOrder={setOrder}
              setItem={setItem}
              total={total}
              setTotal={setTotal}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="row">
            <Menu
              item={item}
              setItem={setItem}
              order={order}
              setOrder={setOrder}
              currentData={currentData}
              setCurrentData={setCurrentData}
            />

            <div className="checkout">
              <Basket
                order={order}
                setOrder={setOrder}
                setItem={setItem}
                total={total}
                setTotal={setTotal}
              />
            </div>
          </div>

          <div className="hidden">
            <Basket
              order={order}
              setOrder={setOrder}
              setItem={setItem}
              total={total}
              setTotal={setTotal}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Order;
