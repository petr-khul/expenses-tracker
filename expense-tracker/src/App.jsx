import React, { useState, useEffect } from 'react'
import Income from "./Income";
import Expense from "./Expense";
import Overview from "./Overview";

import './App.css'

function App() {
  const [expenses, setExpenses] = useState([]);

  //load expenses from json file
  useEffect(() => {
    fetch("http://localhost:3001/expenses")
      .then((response) => response.json())
      .then((data) => setExpenses(data));
  }, []);


  //log loaded expenses into console for debugging purposes
  useEffect(() => {
    console.log(expenses);
  }, [expenses]);
  

  return (
    <>
      <div className="main-root">
        <div className="header">
          <h1>💸 Cool Expense Tracker 💰</h1>
          </div>
        <Income />
        <Expense />
        <Overview />
      </div>
    </>
  )
}

export default App
