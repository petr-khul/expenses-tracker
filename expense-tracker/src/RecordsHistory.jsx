import React, { useState } from "react";
import styles from "./RecordsHistory.module.css";

function RecordsHistory({ expenses, deleteExpense }) {
  const [filters, setFilters] = useState({
    month: "", // Format: MM (e.g., "12" for December)
    year: "", // Format: YYYY (e.g., "2024")
    transactionType: "", // "Income" or "Expense"
    category: "", // Specific category name
  });

  // Filter logic
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const monthMatch = filters.month ? expenseDate.getMonth() + 1 === parseInt(filters.month) : true;
    const yearMatch = filters.year ? expenseDate.getFullYear() === parseInt(filters.year) : true;
    const typeMatch = filters.transactionType ? expense.transactionType === filters.transactionType : true;
    const categoryMatch = filters.category ? expense.category === filters.category : true;

    return monthMatch && yearMatch && typeMatch && categoryMatch;
  });

  const sortedExpenses = filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Calculate total income and expense
  const totalIncome = filteredExpenses
    .filter((expense) => expense.transactionType === "Income")
    .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  const totalExpense = filteredExpenses
    .filter((expense) => expense.transactionType === "Expense")
    .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.recordsHistory} style={{ maxHeight: "400px", overflowY: "auto" }}>
      <h3 className={styles.boxHeader}>Records History</h3>

      {/* Filters */}
      <div className={styles.filters}>
        <select name="month" onChange={handleFilterChange} value={filters.month}>
          <option value="">All Months</option>
          {[...Array(12).keys()].map((month) => (
            <option key={month + 1} value={month + 1}>
              {new Date(0, month).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select name="year" onChange={handleFilterChange} value={filters.year}>
          <option value="">All Years</option>
          {Array.from(new Set(expenses.map((expense) => new Date(expense.date).getFullYear())))
            .sort()
            .map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>

        <select name="transactionType" onChange={handleFilterChange} value={filters.transactionType}>
          <option value="">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <select name="category" onChange={handleFilterChange} value={filters.category}>
          <option value="">All Categories</option>
          {Array.from(new Set(expenses.map((expense) => expense.category))).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Display totals for filtered data */}
      <div className={styles.totals}>
        <p>Total fitlered income: <span className={styles.incomeFormat}>{totalIncome.toFixed(0)} CZK</span></p>
        <p>Total filtered expense: <span className={styles.expenseFormat}>{totalExpense.toFixed()} CZK</span></p>
      </div>

      {/* Filtered and Sorted List */}
        <div className={styles.records}>
            <ul>
                {sortedExpenses.map((expense) => (
                <li key={expense.id}>
                    <div>
                    {expense.category}{" | "}
                    <span
                        className={expense.transactionType === "Income" ? styles.income : styles.expense}
                    >
                        {expense.amount} CZK
                    </span>
                    {" | "} {expense.date}
                    {" | "} {expense.type}
                    {" | "} {expense.note}
                    </div>
                    <div>
                    <button
                        className={styles.deleteButton}
                        onClick={() => deleteExpense(expense.id)}
                    >
                        ❌
                    </button>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    </div>
  );
}

export default RecordsHistory;
