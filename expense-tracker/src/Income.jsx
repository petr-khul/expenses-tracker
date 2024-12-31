import React, {useState, useEffect} from "react";
import styles from "./Income.module.css";
import saveRecords from "./handlers";

function Income(props){
    const today = new Date().toISOString().split('T')[0];

    const records = props.expenses;
    //const id = props.nextId;
    
    const [incomeCategory, setIncomeCategory] = useState("");
    const [incomeAmount, setIncomeAmount] = useState("");
    const [incomeDate, setIncomeDate] = useState(today);
    const [incomeType, setIncomeType] = useState("");
    const [incomeNote, setIncomeNote] = useState("");
    const [nextId, setNextId] = useState(records.length + 1);

    useEffect(() => {
        setNextId(records.length + 1);
    }, [records]);


    const handleIncomeCategoryChange = (event) => {
        setIncomeCategory(event.target.value);
    }

    const handleIncomeAmountChange = (event) => {
        setIncomeAmount(event.target.value);
    }

    const handleIncomeDateChange = (event) => {
        setIncomeDate(event.target.value);
    }

    const handleIncomeTypeChange = (event) => {
        setIncomeType(event.target.value);
    }

    const handleIncomeNoteChange = (event) => {
        setIncomeNote(event.target.value);
    }

    const handleIncomeSubmit = (event) => {
        event.preventDefault();
        const transactionType = "Income"; //default transaction type for incomes


        //creates new object to be added into array
        const newIncomeRecord = {
            id: nextId,
            transactionType: transactionType,
            incomeAmount: incomeAmount,
            incomeDate: incomeDate,
            incomeType: incomeType,
            incomeNote: incomeNote
        }
        
        // log to console for debugging purposes
        console.log(newIncomeRecord); 
        console.log(records);

        // Save the record and update the state in the parent
        saveRecords(newIncomeRecord).then((success) => {
            if (success) {
                props.updateExpenses(newIncomeRecord); // Only update on success
            }
        });
            

         // Reset the form fields after submitting
        setIncomeCategory("");
        setIncomeAmount("");
        setIncomeDate(today);
        setIncomeType("");
        setIncomeNote("");
    }


    return (
        <div className={styles.income}>
            
            <h3>Add an Income</h3>

            <form onSubmit={handleIncomeSubmit} className={styles.incomeForm}>
                <select className={styles.incomeCategory} 
                    id="income-category" 
                    value={incomeCategory} 
                    onChange={handleIncomeCategoryChange}
                    required>
                        <option value="">-- Select an Income Category --</option>  {/* Default empty option */}
                        <option value="Salary">Salary</option>
                        <option value="Side hustle">Side hustle</option>
                        <option value="Business income">Business income</option>
                        <option value="Pension or retirement">Pension or Retirement</option>
                        <option value="Gift">Gift</option>
                        <option value="Other">Other</option>
                </select>

                <input type="number" 
                    className={styles.input} 
                    min={0} 
                    placeholder="Enter an amount in CZK" 
                    value={incomeAmount} 
                    onChange={handleIncomeAmountChange} 
                    required 
                />

                <input
                    className={styles.input} 
                    type="date"
                    id="dateInput"
                    value={incomeDate}
                    onChange={handleIncomeDateChange}
                    required
                />

                <div className={styles.incomeType}>
                    <label>
                        <input
                        type="radio"
                        name="incomeType"
                        value="Cashless"
                        checked={incomeType === 'Cashless'}
                        onChange={handleIncomeTypeChange}
                        />
                        Cashless
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="incomeType"
                            value="Cash"
                            checked={incomeType === 'Cash'}
                            onChange={handleIncomeTypeChange}
                        />
                        Cash
                    </label>
                </div>

                <textarea
                        className={styles.incomeNote}
                        value={incomeNote}
                        onChange={handleIncomeNoteChange}
                        placeholder="Notes..."
                        rows="5"
                        cols="50"
                />

                <button className={styles.addIncome} type="submit" >Add income</button>    

            </form>
        </div>
    )
}

export default Income;