import React, { useState, useEffect } from 'react'

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

    </>
  )
}

export default App
