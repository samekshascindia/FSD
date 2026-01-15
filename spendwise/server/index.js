const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const TransactionSchema = new mongoose.Schema({
  title: String,
  amount: Number, // Positive for income, negative for expense
  category: String,
  date: { type: Date, default: Date.now }
});
const Transaction = mongoose.model('Transaction', TransactionSchema);

// Routes
// 1. Add Transaction
app.post('/api/transaction', async (req, res) => {
  const newTransaction = new Transaction(req.body);
  await newTransaction.save();
  res.json(newTransaction);
});

// 2. Get Transactions
app.get('/api/transaction', async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));