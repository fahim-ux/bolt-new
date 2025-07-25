import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResultsPage from './pages/ResultsPage';
import TransactionDetails from './pages/TransactionDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Routes>
          <Route path="/" element={<ResultsPage />} />
          <Route path="/transaction/:id" element={<TransactionDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;