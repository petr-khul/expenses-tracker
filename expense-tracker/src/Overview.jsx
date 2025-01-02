import React, {useState, useEffect} from "react";
import styles from "./Overview.module.css";

function Overview(props){
    
    let expenses = props.expenses;
    //function to check if the date is in this month
    const isThisMonth = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth();
    };
  
    //caculate sum of all incomes
    const incomesTotal = expenses
    .filter((item) => item.transactionType === "Income")
    .reduce((total, item) => total + parseFloat(item.amount), 0);

    const expensesTotal = expenses
    .filter((item) => item.transactionType === "Expense")
    .reduce((total, item) => total + parseFloat(item.amount), 0);

    //caculate sum this month income
    const calculateThisMonthIncome = (expenses) => {
        const totalIncomeThisMonth = expenses
          .filter(
            (item) =>
              item.transactionType === "Income" && isThisMonth(item.date)
          )
          .reduce((total, item) => total + parseFloat(item.amount), 0);
      
        return totalIncomeThisMonth;
    };

    //caculate sum this month income
    const calculateThisMonthExpenses = (expenses) => {
        const totalExpenseThisMonth = expenses
            .filter(
             (item) =>
               item.transactionType === "Income" && isThisMonth(item.date)
            )
            .reduce((total, item) => total + parseFloat(item.amount), 0);
          
        return totalExpenseThisMonth;
    };

    const currentBudgetState = incomesTotal-expensesTotal;
    const thisMonthIncome = calculateThisMonthIncome(props.expenses);
    const thisMonthExpense= calculateThisMonthExpenses(props.expenses);

    return(
        <div className={styles.overview}>
            <h3>Overview</h3>
            <ul className={styles.overviewLi}>
                <li>Current budget state  <strong 
                    style={{ color: currentBudgetState >= 0 ? "green" : "red", }}>
                        {currentBudgetState} CZK</strong></li>
                <li>Total incomes this month <strong>{thisMonthIncome} CZK</strong></li>
                <li>Total expenses this month <strong>{thisMonthExpense} CZK</strong></li>
            </ul>

        </div>
    )
}

export default Overview;