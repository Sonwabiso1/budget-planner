import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Budget from './pages/Budget';
import logo from "./assets/Dollar money logo template (1).png"

function App() {
  return (
    <Router>
      <div className="p-4 bg-nedbankGreen min-h-screen text-white">
        <nav className="mb-4">
          <div className="flex space-x-4 font-mono font-bold text-4xl">
          <img alt="image" src={logo} className="w-20" />
          <p>Budget Planner</p>
        </div>
          <ul className="flex space-x-8 justify-center">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/budget">Budget</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/budget" element={<Budget />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;