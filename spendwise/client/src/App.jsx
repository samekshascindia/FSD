import { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// Import icons
import { FaWallet, FaMoneyBillWave, FaCoins } from 'react-icons/fa';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ title: '', amount: '', category: '' });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/transaction');
      setTransactions(res.data);
    } catch (err) { console.error(err); }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) return;
    await axios.post('http://localhost:5000/api/transaction', { ...form, amount: Number(form.amount) });
    fetchTransactions();
    setForm({ title: '', amount: '', category: '' });
  };

  // Calculations
  const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + Math.abs(t.amount), 0);
  const balance = income - expense;

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  // Chart Data
  const data = [
    { name: 'Income', value: income },
    { name: 'Expense', value: expense }
  ];
  const COLORS = ['#2ec4b6', '#e71d36']; // Matches CSS success/danger colors

  return (
    <div className="dashboard-container">
      <header>
        <h1>SpendWise Analytics</h1>
      </header>

      {/* --- Summary Cards with Icons --- */}
      <div className="summary-grid">
        <div className="card balance">
          <div className="card-content">
            <h4>Total Balance</h4>
            <p className="money">{formatMoney(balance)}</p>
          </div>
          <div className="icon-box balance-icon"><FaWallet /></div>
        </div>
        
        <div className="card income">
          <div className="card-content">
            <h4>Total Income</h4>
            <p className="money">+{formatMoney(income)}</p>
          </div>
          <div className="icon-box income-icon"><FaMoneyBillWave /></div>
        </div>

        <div className="card expense">
          <div className="card-content">
            <h4>Total Expenses</h4>
            <p className="money">-{formatMoney(expense)}</p>
          </div>
          <div className="icon-box expense-icon"><FaCoins /></div>
        </div>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="main-grid">
        {/* Left Column */}
        <div className="left-column">
          {/* Form Card */}
          <div className="white-card">
            <h3>Add New Transaction</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Title</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Freelance Project" />
              </div>
              <div className="input-group">
                <label>Amount (Negative for expense)</label>
                <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="e.g. 5000 or -200" />
              </div>
              <div className="input-group">
                <label>Category</label>
                <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Business" />
              </div>
              <button className="submit-btn" type="submit">Add Transaction</button>
            </form>
          </div>

          {/* History Card */}
          <div className="white-card">
            <h3>Transaction History</h3>
            {transactions.length === 0 ? <p style={{color: '#999'}}>No data available</p> : (
              <ul className="transaction-list">
                {transactions.slice().reverse().map((t) => (
                  <li key={t._id} className="transaction-item">
                    <div>
                      <span className="t-title">{t.title}</span>
                      <span className="t-cat">{t.category}</span>
                    </div>
                    <span className={`t-amount ${t.amount > 0 ? 'plus' : 'minus'}`}>
                      {t.amount > 0 ? '+' : ''}{formatMoney(t.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Column: Centered Chart */}
        <div className="right-column">
          <div className="white-card chart-box">
            <h3>Financial Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatMoney(value)} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px' }}/>
              </PieChart>
            </ResponsiveContainer>
            <p style={{marginTop: '10px', color: '#8d99ae', fontSize: '0.9rem'}}>Income vs Expense Ratio</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;