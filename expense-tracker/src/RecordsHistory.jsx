import React, {useState, useEffect} from "react";
import styles from "./RecordsHistory.module.css";

function RecordsHistory({ expenses, deleteExpense }){
    //console.log(props.expenses);
    const sortedExpenses = expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return(
        <div className={styles.overviewHistory} style={{ maxHeight: "400px", overflowY: "auto" }}>
            <h3 className={styles.boxHeader}>Records history</h3>
            <ul>
                {sortedExpenses.map((expense) => (
                <li key={expense.id}>
                    <div>
                    {expense.category}{" | "}
                    <span className=
                        {expense.transactionType === "Income" ? styles.income : styles.expense}
                    >
                    {expense.amount} CZK
                    </span>
                    {" | "} {expense.date}
                    </div>
                    <div>
                    <button className={styles.deleteButton} onClick={() =>deleteExpense(expense.id)} >❌</button>
                    </div>
                </li>

                ))}
            </ul>
        </div>
    )
}

export default RecordsHistory;