import React, { useState, useEffect } from 'react';
import Income from "./Income";
import Expense from "./Expense";
import RecordsHistory from "./RecordsHistory";
import Overview from "./Overview";
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextId, setNextId] = useState(1); // Use a state to manage nextId

  // Load expenses from json file
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

  // Recalculate nextId whenever expenses change
  useEffect(() => {
    if (expenses.length === 0) {
      setNextId(1);
    } else {
      const maxId = Math.max(...expenses.map((expense) => expense.id)) + 1;
      setNextId(maxId); // Update nextId based on the current expenses
    }
  }, [expenses]); // This effect runs whenever expenses change

  // Update expenses state after adding a new record
  const updateExpenses = (newExpense) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, newExpense];
    });
  };

  // Delete an expense and update the state
  const deleteExpense = (id) => {
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

  return (
    <>
      <div className="main-root">
        <div className="header">
          <h1>💸 Cool Expense Tracker 💰</h1>
        </div>
        <div className="main-modules">
          {!isLoading ? (
            <Income expenses={expenses} updateExpenses={updateExpenses} nextId={nextId} />
          ) : (
            <p>Loading...</p>
          )}
          <Expense expenses={expenses} updateExpenses={updateExpenses} nextId={nextId} />
          <Overview expenses={expenses} updateExpenses={updateExpenses} />
        </div>
        <div className="history-and-statistics">
          {!isLoading ? (
            <RecordsHistory
              expenses={expenses}
              updateExpenses={updateExpenses}
              deleteExpense={deleteExpense}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
