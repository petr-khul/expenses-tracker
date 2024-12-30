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
    const jsonData = JSON.parse(data || "[]");
    res.json(jsonData);
  } catch (err) {
    console.error("Error reading expenses file:", err.message);
    res.status(500).send("Error reading expenses file.");
  }
});


// Write expenses
app.post("/expenses", (req, res) => {
  try {
    const expenses = req.body;
    fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2));
    res.status(200).send("Expenses saved!");
  } catch (err) {
    res.status(500).send("Error saving expenses.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
