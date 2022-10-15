import React, { useState, createContext } from "react";

export const DataContext = createContext([]);

export const DataProvider = (props) => {
  const [item, setItem] = useState("cheese");
  const [action, setAction] = useState("list");

  return (
    <div>
      <DataContext.Provider value={[item, setItem, action, setAction]}>
        {props.children}
      </DataContext.Provider>
    </div>
  );
};
