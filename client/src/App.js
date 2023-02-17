import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

import Navbar from "./components/navbar";
import Home from "./components/homepage/HomePage";
import Login from "./components/register/loginPage";
import Register from "./components/register/registerPage";
import Dashboard2 from "./components/homepage/addTransactionComp";
import TransactionList from "./components/homepage/transactionPage";
import RecurringExpenses from "./components/homepage/recurringExpensesPage";
import Dashboard from "./components/homepage/dashboardPage";
import getUserInfo from "./utilities/decodeJwt";


export const UserContext = createContext();

document.body.style = 'background: rgb(234,237,242)';


const App = () => {

  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <>
      <Navbar/>
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/dashboard2" element={<Dashboard2 />} />
          <Route exact path="/transactions" element={<TransactionList />} />
          <Route exact path="/recurringExpenses" element={<RecurringExpenses />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};



export default App
