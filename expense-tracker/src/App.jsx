import React, { useState, useEffect } from 'react'
import Income from "./Income";
import Expense from "./Expense";
import Overview from "./Overview";

import './App.css'

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let nextId = expenses.length + 1;


  //load expenses from json file
  useEffect(() => {
    fetch("http://localhost:3001/expenses")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setExpenses(data); // Set data if it's a valid array
        } else {
          console.error("Invalid data format received:", data);
          setExpenses([]); // Fallback to an empty array if data is not valid
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
        setExpenses([]); // Fallback to an empty array in case of fetch error
        setIsLoading(false);
      });
  }, []);
  

  const updateExpenses = (newExpense) => {
    setExpenses((prevExpenses) => {
      if (!Array.isArray(prevExpenses)) {
        console.error("prevExpenses is not an array:", prevExpenses);
        return [newExpense]; // Fallback to a new array
      }

      return [...prevExpenses, newExpense];
    });
  };
  


  //log loaded expenses into console for debugging purposes
  /*
  useEffect(() => {
    console.log(expenses);
  }, [expenses]);
  */
  

  return (
    <>
      <div className="main-root">
        <div className="header">
          <h1>💸 Cool Expense Tracker 💰</h1>
          </div>
          {!isLoading ? <Income expenses={expenses} updateExpenses={updateExpenses} id={nextId}/> : <p>Loading...</p>}
        <Expense />
        <Overview />
      </div>
    </>
  )
}

export default App;
