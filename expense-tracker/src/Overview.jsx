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

    //function to check if the date is in last month
    const isLastMonth = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
    
        // Calculate the last month and year
        const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1; // Wrap around to December if it's January
        const lastMonthYear = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
    
        return date.getFullYear() === lastMonthYear && date.getMonth() === lastMonth;
    };

    //function to check if the date is in this year
    const isThisYear = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        return date.getFullYear() === today.getFullYear();
    };

    //function to check if the date is in last year
    const isLastYear = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        return date.getFullYear() === today.getFullYear() - 1;
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
               item.transactionType === "Expense" && isThisMonth(item.date)
            )
            .reduce((total, item) => total + parseFloat(item.amount), 0);
          
        return totalExpenseThisMonth;
    };

    //caculate sum last month income
        const calculateLastMonthIncome = (expenses) => {
        const totalIncomeLastMonth = expenses
            .filter(
            (item) =>
                item.transactionType === "Income" && isLastMonth(item.date)
            )
            .reduce((total, item) => total + parseFloat(item.amount), 0);
          
        return totalIncomeLastMonth;
    };

    //caculate sum last month expenses
    const calculateLastMonthExpenses = (expenses) => {
        const totalExpenseLastMonth = expenses
            .filter(
            (item) =>
                item.transactionType === "Expense" && isLastMonth(item.date)
            )
            .reduce((total, item) => total + parseFloat(item.amount), 0);
              
        return totalExpenseLastMonth;
    };

    //caculate sum this year income
    const calculateThisYearIncome = (expenses) => {
        const totalIncomeThisYear = expenses
            .filter(
            (item) =>
                item.transactionType === "Income" && isThisYear(item.date)
            )
            .reduce((total, item) => total + parseFloat(item.amount), 0);
              
        return totalIncomeThisYear;
    };

    //caculate sum this year expenses
    const calculateThisYearExpenses = (expenses) => {
        const totalExpensesThisYear = expenses
            .filter(
            (item) =>
                item.transactionType === "Expense" && isThisYear(item.date)
            )
            .reduce((total, item) => total + parseFloat(item.amount), 0);
                  
        return totalExpensesThisYear;
    };

    //caculate sum last year income
    const calculateLastYearIncome = (expenses) => {
        const totalIncomeLastYear = expenses
            .filter(
            (item) =>
                item.transactionType === "Income" && isLastYear(item.date)
            )
            .reduce((total, item) => total + parseFloat(item.amount), 0);
                  
        return totalIncomeLastYear;
    };
    
    //caculate sum last year expenses
    const calculateLastYearExpenses = (expenses) => {
        const totalExpensesLastYear = expenses
            .filter(
            (item) =>
                item.transactionType === "Expense" && isLastYear(item.date)
            )
            .reduce((total, item) => total + parseFloat(item.amount), 0);
                      
        return totalExpensesLastYear;
    };

    const currentBudgetState = incomesTotal-expensesTotal;
    const thisMonthIncome = calculateThisMonthIncome(props.expenses);
    const thisMonthExpense= calculateThisMonthExpenses(props.expenses);
    const lastMonthIncome = calculateLastMonthIncome(props.expenses);
    const lastMonthExpense= calculateLastMonthExpenses(props.expenses);
    const thisYearIncome = calculateThisYearIncome(props.expenses);
    const thisYearExpense = calculateThisYearExpenses(props.expenses);
    const lastYearIncome = calculateLastYearIncome(props.expenses);
    const lastYearExpense = calculateLastYearExpenses(props.expenses);

    return(
        <div className={styles.overview}>
            <h3>Overview</h3>
            <ul className={styles.overviewLi}>
                <li style={{fontSize:"1.2rem", fontWeight: "bolder"}}>Current budget state  <strong 
                            style={{ 
                                color: currentBudgetState >= 0 
                                    ? "hsla(120, 100%, 50%, 0.5)" 
                                    : "hsla(0, 100%, 55%, 0.6)",
                                fontSize: "1.2rem",
                            }}>
                        {currentBudgetState} CZK</strong></li>
                <hr />
                <li>Total incomes this month <strong><span className={styles.incomeFormat}>{thisMonthIncome} CZK</span></strong></li>
                <li>Total expenses this month <strong><span className={styles.expenseFormat}>{thisMonthExpense} CZK</span></strong></li>
                <hr />
                <li>Total incomes last month <strong><span className={styles.incomeFormat}>{lastMonthIncome} CZK</span></strong></li>
                <li>Total expenses last month <strong><span className={styles.expenseFormat}>{lastMonthExpense} CZK</span></strong></li>
                <hr />
                <li>Total incomes this year <strong><span className={styles.incomeFormat}>{thisYearIncome} CZK</span></strong></li>
                <li>Total expenses this year <strong><span className={styles.expenseFormat}>{thisYearExpense} CZK</span></strong></li>
                <hr />
                <li>Total incomes last year <strong><span className={styles.incomeFormat}>{lastYearIncome} CZK</span></strong></li>
                <li>Total expenses last year <strong><span className={styles.expenseFormat}>{lastYearExpense} CZK</span></strong></li>
            </ul>

        </div>
    )
}

export default Overview;