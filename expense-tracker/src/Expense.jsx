import React, {useState, useEffect} from "react";
import styles from "./Expense.module.css";
import saveRecords from "./handlers";


function Expense(props){
    const today = new Date().toISOString().split('T')[0]; //for date initial state
    const records = props.expenses; //assigns value

    const [expenseCategory, setExpenseCategory] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const [expenseDate, setExpenseDate] = useState(today);
    const [expenseType, setExpenseType] = useState("");
    const [expenseNote, setExpenseNote] = useState("");
    const [nextId, setNextId] = useState(records.length + 1);

    //dynamically udpates the id
    useEffect(() => {
        setNextId(records.length + 1);
    }, [records]);

    const handleExpenseCategoryChange = (event) => {
        setExpenseCategory(event.target.value);
    }

    const handleExpenseAmountChange = (event) => {
        setExpenseAmount(event.target.value);
    }

    const handleExpenseDateChange = (event) => {
        setExpenseDate(event.target.value);
    }

    const handleExpenseTypeChange = (event) => {
        setExpenseType(event.target.value);
    }

    const handleIExpenseNoteChange = (event) => {
        setExpenseNote(event.target.value);
    }

    const handleExpenseSubmit = (event) => {
        event.preventDefault();
        const transactionType = "Expense"; //default transaction type for incomes


        //creates new object to be added into array
        const newExpenseRecord = {
            id: nextId,
            transactionType: transactionType,
            category: expenseCategory,
            amount: expenseAmount,
            date: expenseDate,
            expenseType: expenseType,
            expenseNote: expenseNote
        }
        
        // log to console for debugging purposes
        //console.log(newIncomeRecord); 
        //console.log(records);

        // Save the record and update the state in the parent
        saveRecords(newExpenseRecord).then((success) => {
            if (success) {
                props.updateExpenses(newExpenseRecord); // Only update on success
            }
        });
            

         // Reset the form fields after submitting
        setExpenseCategory("");
        setExpenseAmount("");
        setExpenseDate(today);
        setExpenseType("");
        setExpenseNote("");
    }

    return (
        <div className={styles.expenses}>
            <h3>Add an Expense</h3>

            <form onSubmit={handleExpenseSubmit} className={styles.expenseForm}>
                <select className={styles.expenseCategory} 
                    id="expenseCategory" 
                    value={expenseCategory} 
                    onChange={handleExpenseCategoryChange}
                    required>
                        <option value="">-- Select an Expense Category --</option>  {/* Default empty option */}
                        <option value="Housing">Housing</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Food and Groceries">Food and Groceries</option>
                        <option value="Health and Medical Expenses">Health and Medical Expenses</option>
                        <option value="Insurance">Insurance</option>
                        <option value="Entertainment and Leisure">Entertainment and Leisure</option>
                        <option value="Personal Care and Beauty">Personal Care and Beauty</option>
                        <option value="Debt Repayments">Debt Repayments</option>
                        <option value="Childcare and Education">Childcare and Education</option>
                        <option value="Savings and Investments">Savings and Investments</option>
                        <option value="Clothing and Accessories">Clothing and Accessories</option>
                        <option value="Gifts and Donations">Gifts and Donations</option>
                        <option value="Taxes">Taxes</option>
                        <option value="Other">Other</option>
                </select>

                <input type="number" 
                    className={styles.input} 
                    min={0} 
                    placeholder="Enter an amount in CZK" 
                    value={expenseAmount} 
                    onChange={handleExpenseAmountChange} 
                    required 
                />

                <input
                    className={styles.input} 
                    type="date"
                    id="dateInput"
                    value={expenseDate}
                    onChange={handleExpenseDateChange}
                    required
                />

                <div className={styles.expenseType}>
                    <label>
                        <input
                        type="radio"
                        name="expenseType"
                        value="Card"
                        checked={expenseType === 'Card'}
                        onChange={handleExpenseTypeChange}
                        />
                        Card
                    </label>
                    <br />
                    <label>
                        <input
                        type="radio"
                        name="expenseType"
                        value="BT"
                        checked={expenseType === 'BT'}
                        onChange={handleExpenseTypeChange}
                        />
                        BT
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="incoexpenseTypemeType"
                            value="Cash"
                            checked={expenseType === 'Cash'}
                            onChange={handleExpenseTypeChange}
                        />
                        Cash
                    </label>
                </div>

                <textarea
                        className={styles.expenseNote}
                        value={expenseNote}
                        onChange={handleIExpenseNoteChange}
                        placeholder="Notes..."
                        rows="5"
                        cols="50"
                />

                <button className={styles.addExpense} type="submit" >Add expense</button>    

            </form>
            
        </div>
    );
}


export default Expense;