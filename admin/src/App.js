import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/Navbar";
import RecordList from "./components/recordList";
import ToppingsRecordList from "./components/toppingsRecordList";
import Edit from "./components/edit";
import ToppingsEdit from "./components/toppingsEdit";
import Create from "./components/create";
import { DataProvider } from "./util/DataProvider";

const App = () => {
  return (
    <DataProvider>
      <Navbar />

      <Routes>
        <Route path="/toppings" element={<ToppingsRecordList />} />
        <Route path="/edit/toppings/:id" element={<ToppingsEdit />} />
        <Route path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </DataProvider>
  );
};

export default App;
