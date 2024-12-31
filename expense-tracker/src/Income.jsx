import React, {useState} from "react";
import styles from "./Income.module.css";

function Income(){
    const today = new Date().toISOString().split('T')[0];
    
    const [incomeCategory, setIncomeCategory] = useState("");
    const [incomeAmount, setIncomeAmount] = useState();
    const [incomeDate, setIncomeDate] = useState(today);
    const [incomeType, setIncomeType] = useState();
    const [incomeNote, setIncomeNote] = useState("");


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
        const transactionType = "Income";

        const income = {
            type: {transactionType},
            
        }
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
                    placeholder="Enter an amount..." 
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

                <button className={styles.addIncome} type="submit" onClick={handleIncomeSubmit}>Add income</button>    

            </form>
        </div>
    )
}

export default Income;