import "./styles/app.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Order from "./components/Order";
import CheckOut from "./components/CheckOut";

function App() {
  const [item, setItem] = useState("pizza");
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

  return (
    <div className="App">
      <Navbar item={item} setItem={setItem} />
      {item === "checkout" ? (
        <CheckOut
          order={order}
          setOrder={setOrder}
          item={item}
          setItem={setItem}
          total={total}
          setTotal={setTotal}
        />
      ) : (
        <Order
          item={item}
          setItem={setItem}
          order={order}
          setOrder={setOrder}
          total={total}
          setTotal={setTotal}
        />
      )}
    </div>
  );
}

export default App;
