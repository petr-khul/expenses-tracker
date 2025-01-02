import React, { useState, useEffect } from 'react'
import Income from "./Income";
import Expense from "./Expense";
import Overview from "./Overview";

import './App.css'

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // sets ID of next record and sends as a prop
  let nextId = expenses.length > 0 
  ? Math.max(...expenses.map(expense => expense.id)) + 1 : 1; 


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
  

  //update after adding new record
  const updateExpenses = (newExpense) => {
    setExpenses((prevExpenses) => {
      if (!Array.isArray(prevExpenses)) {
        console.error("prevExpenses is not an array:", prevExpenses);
        return [newExpense]; // Fallback to a new array
      }

      return [...prevExpenses, newExpense];
    });
  };

    // Delete an expense and update the state
    const deleteExpense = (id) => {
      // Send a DELETE request to the API
      fetch(`http://localhost:3001/expenses/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // If the request was successful, remove the expense from the local state
            setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
          } else {
            console.error("Failed to delete expense");
          }
        })
        .catch((error) => {
          console.error("Error deleting expense:", error);
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
        <div className="main-modules">
          {!isLoading ? <Income expenses={expenses} updateExpenses={updateExpenses} id={nextId}/> : <p>Loading...</p>}
          <Expense expenses={expenses} updateExpenses={updateExpenses} id={nextId}/>
          {!isLoading ? <Overview expenses={expenses} updateExpenses={updateExpenses} deleteExpense={deleteExpense} /> : <p>Loading...</p>}
        </div>
      </div>
    </>
  )
}

export default App;
