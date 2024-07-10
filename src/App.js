import './App.css';
import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;