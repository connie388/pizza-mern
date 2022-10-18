import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/Navbar";
import RecordList from "./components/recordList";
import ToppingsRecordList from "./components/toppingsRecordList";
import MenuChoiceRecordList from "./components/menuChoiceRecordList";
import MenuChoiceByCategoryRecordList from "./components/menuChoiceByCategoryRecordList";
import Edit from "./components/edit";
import ToppingsEdit from "./components/toppingsEdit";
import MenuChoiceEdit from "./components/menuChoiceEdit";
import MenuChoiceByCategoryEdit from "./components/menuChoiceByCategoryEdit";
import Create from "./components/create";
import ToppingsCreate from "./components/toppingsCreate";
import MenuChoiceCreate from "./components/menuChoiceCreate";
import MenuChoiceByCategoryCreate from "./components/menuChoiceByCategoryCreate";
import { DataProvider } from "./util/DataProvider";

const App = () => {
  return (
    <DataProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/toppings" element={<ToppingsRecordList />} />
        <Route path="/edit/toppings/:id" element={<ToppingsEdit />} />
        <Route path="/create/toppings" element={<ToppingsCreate />} />
        <Route
          path="/menuchoicebycategory"
          element={<MenuChoiceByCategoryRecordList />}
        />
        <Route
          path="/edit/menuchoicebycategory/:id"
          element={<MenuChoiceByCategoryEdit />}
        />
        <Route
          path="/create/menuchoicebycategory"
          element={<MenuChoiceByCategoryCreate />}
        />
        <Route path="/menuchoice" element={<MenuChoiceRecordList />} />
        <Route path="/edit/menuchoice/:id" element={<MenuChoiceEdit />} />
        <Route path="/create/menuchoice" element={<MenuChoiceCreate />} />
      </Routes>
    </DataProvider>
  );
};

export default App;
