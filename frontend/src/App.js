import './App.css';
import './assets/css/sidebar.css';
import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
      {/* creating routes */}
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Dashboard" element ={<Dashboard />} />
      </Routes>
    
    </div>
  );
}

export default App;
