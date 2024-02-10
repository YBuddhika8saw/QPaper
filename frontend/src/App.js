import './App.css';
import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home'

function App() {
  return (
    <div>
      {/* creating routes */}
      <Routes>
        <Route path="/Home" element={<Home />} />
      </Routes>
    
    </div>
  );
}

export default App;
