import React, { useState, useEffect } from 'react';

function Budget() {
  const [income, setIncome] = useState(0);
  const [savings, setSavings] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses'));
    const savedIncome = localStorage.getItem('income');
    const savedSavings = localStorage.getItem('savings');

    if (savedExpenses) setExpenses(savedExpenses);
    if (savedIncome) setIncome(Number(savedIncome));
    if (savedSavings) setSavings(Number(savedSavings));
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('income', income);
    localStorage.setItem('savings', savings);
  }, [expenses, income, savings]);

  const addExpense = () => {
    if (expense && expenseAmount > 0) {
      if (editingIndex !== null) {
        const updatedExpenses = expenses.map((exp, index) =>
          index === editingIndex ? { name: expense, amount: parseFloat(expenseAmount) } : exp
        );
        setExpenses(updatedExpenses);
        setEditingIndex(null);
      } else {
        setExpenses([...expenses, { name: expense, amount: parseFloat(expenseAmount) }]);
      }
      setExpense('');
      setExpenseAmount(0);
    }
  };

  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const editExpense = (index) => {
    const exp = expenses[index];
    setExpense(exp.name);
    setExpenseAmount(exp.amount);
    setEditingIndex(index);
  };

  const totalExpenses = expenses.reduce((total, item) => total + item.amount, 0);
  const remainingBalance = income - (totalExpenses + savings);
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">💰 Budget Planner for {currentMonth}</h1>

      {/* Income Section */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600 mb-2">Income</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
          value={income}
          onChange={(e) => setIncome(parseFloat(e.target.value))}
          placeholder="Enter your total income"
        />
      </div>

      {/* Savings Section */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600 mb-2">Savings</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
          value={savings}
          onChange={(e) => setSavings(parseFloat(e.target.value))}
          placeholder="Enter savings amount"
        />
      </div>

      {/* Expense Input Section */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600 mb-2">Expense Name</label>
        <input
          type="text"
          className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
          placeholder="Enter expense name"
          autoComplete="off"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600 mb-2">Expense Amount</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(parseFloat(e.target.value))}
          placeholder="Enter expense amount"
        />
      </div>

      <button
        onClick={addExpense}
        className="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
      >
        {editingIndex !== null ? 'Update Expense' : 'Add Expense'}
      </button>

      {/* Expense List */}
      <ul className="mt-6 space-y-4">
        {expenses.map((exp, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white p-4 shadow rounded-lg text-gray-700"
          >
            <span>
              {exp.name}: <span className="font-semibold">R{exp.amount.toFixed(2)}</span>
            </span>
            <div className="space-x-2">
              <button
                onClick={() => editExpense(index)}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteExpense(index)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Summary Section */}
      <div className="mt-8 p-4 bg-white shadow rounded-lg text-gray-700">
        <h2 className="text-lg font-semibold">Summary</h2>
        <p>Total Income: R{income.toFixed(2)}</p>
        <p>Total Expenses: R{totalExpenses.toFixed(2)}</p>
        <p>Total Savings: R{savings.toFixed(2)}</p>
        <p
          className={
            remainingBalance >= 0
              ? 'text-green-500 font-semibold'
              : 'text-red-500 font-semibold'
          }
        >
          Remaining Balance: R{remainingBalance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default Budget;
