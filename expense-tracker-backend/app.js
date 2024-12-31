const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3001;
const filePath = "./data/expenses.json";

app.use(cors());
app.use(express.json());

// Read expenses
app.get("/expenses", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(data || "[]"); // Ensure fallback to an empty array
    res.json(Array.isArray(jsonData) ? jsonData : []); // Ensure it's always an array
  } catch (err) {
    console.error("Error reading expenses file:", err.message);
    res.status(500).send("Error reading expenses file.");
  }
});

// Write expenses
app.post('/expenses', (req, res) => {
  try {
      const newRecord = req.body;

      // Read the existing data from the JSON file
      const fileContent = fs.existsSync(filePath) 
          ? fs.readFileSync(filePath, 'utf-8') 
          : '[]';

      const data = JSON.parse(fileContent);

      // Ensure the file contains an array
      if (!Array.isArray(data)) {
          throw new Error('Data in expenses.json is not an array');
      }

      // Append the new record
      data.push(newRecord);

      // Write back the updated data
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

      //console.log('Record added successfully:', newRecord);
      res.status(201).send({ message: 'Record added successfully', newRecord });
  } catch (error) {
      console.error('Error saving expense:', error);
      res.status(500).send({ message: 'Failed to save expense' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});