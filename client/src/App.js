import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes, useLocation} from "react-router-dom";
import { createContext, useState, useEffect } from "react";

import Navbar from "./components/navbar";
import ErrorPage from "./components/errorPage";

import Login from "./components/register/loginPage";
import Register from "./components/register/registerPage";
import Dashboard2 from "./components/homepage/addTransactionComp";
import AddStockItem from "./components/stockpage/addPortfolioComp";
import AddWatchlistItem from "./components/stockpage/addWatchlistComp";
import TransactionList from "./components/homepage/transactionPage";
import RecurringExpenses from "./components/homepage/recurringExpensesPage";
import Dashboard from "./components/homepage/dashboardPage";
import InvestingPage from "./components/stockpage/investingPage";
import WatchlistPage from "./components/stockpage/watchListPage"; 
import StockPage from "./components/stockpage/stockPage";

import getUserInfo from "./utilities/decodeJwt";

export const UserContext = createContext();

document.body.style = 'background: rgb(234,237,242)';


const App = () => {

  

  const [user, setUser] = useState();

  const location = useLocation()

  useEffect(() => {
    setUser(getUserInfo());

  }, []);

  function locationPlace(){
    if(location.pathname === '/login' || location.pathname === '/register')
    {
      return false
    }
    else{
      return true
    }

  }
  

  if(!user && locationPlace()){
    return(<ErrorPage></ErrorPage>) 
  }

  return (
    <>
      <Navbar/>
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          {user && <><Route exact path="/" element={<Dashboard />} />
          <Route exact path="/dashboard2" element={<Dashboard2 />} />
          <Route exact path="/addStock" element={<AddStockItem />} />
          <Route exact path="/addWatchlist" element={<AddWatchlistItem />} />
          <Route exact path="/transactions" element={<TransactionList />} />
          <Route exact path="/stocks" element={<InvestingPage />} />
          <Route exact path="/allStocks" element={<StockPage />} />
          <Route exact path="/allWatchlist" element={<WatchlistPage />} />
          <Route exact path="/recurringExpenses" element={<RecurringExpenses />} /></>}
        </Routes>
      </UserContext.Provider>
    </>
  );
};



export default App
