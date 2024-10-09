import React, { useState, useEffect } from 'react';

function Budget() {
  const [income, setIncome] = useState(0);
  const [savings, setSavings] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);

  // Load from localStorage when component mounts
  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses'));
    const savedIncome = localStorage.getItem('income');
    const savedSavings = localStorage.getItem('savings');

    if (savedExpenses) setExpenses(savedExpenses);
    if (savedIncome) setIncome(Number(savedIncome));
    if (savedSavings) setSavings(Number(savedSavings));
  }, []);

  // Save to localStorage when expenses, income, or savings change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('income', income);
    localStorage.setItem('savings', savings);
  }, [expenses, income, savings]);

  // Add a new expense to the list
  const addExpense = () => {
  if (expense && expenseAmount > 0) {
    setExpenses([...expenses, { name: expense, amount: parseFloat(expenseAmount) }]);  // Use parseFloat
    setExpense('');  
    setExpenseAmount(0);  
  }
};

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, item) => total + item.amount, 0);

  // Calculate remaining balance
  const remainingBalance = income - (totalExpenses + savings);

  // Get the current month
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div>
      <h1 className="text-xl mb-4">Budget Planner for {currentMonth}</h1>
      
      <div className="mb-4">
        <label className="block mb-2">Income:</label>
        <input
          type="number"
          className="border p-2 w-1/3 text-black"
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          placeholder="Enter your total income"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Savings:</label>
        <input
          type="number"
          className="border p-2 w-1/3 text-black"
          value={savings}
          onChange={(e) => setSavings(Number(e.target.value))}
          placeholder="Enter savings amount"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Expense Name:</label>
        <input
          type="text"
          className="border p-2 w-1/3 text-black"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
          placeholder="Enter expense name"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Expense Amount:</label>
        <input
          type="number"
          className="border p-2 w-1/3 text-black"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(Number(e.target.value))}
          placeholder="Enter expense amount"
        />
      </div>

      <button onClick={addExpense} className="bg-white text-nedbankGreen px-4 py-2">
        Add Expense
      </button>

      <ul className="mt-4">
        {expenses.map((exp, index) => (
          <li key={index} className="p-2 border-b">
            {exp.name}: R{exp.amount.toFixed(2)}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <h2 className="text-lg">Summary</h2>
        <p>Total Income: R{income.toFixed(2)}</p>
        <p>Total Expenses: R{totalExpenses.toFixed(2)}</p>
        <p>Total Savings: R{savings.toFixed(2)}</p>
        <p className={remainingBalance >= 0 ? "text-green-500" : "text-red-500"}>
          Remaining Balance: R{remainingBalance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default Budget;