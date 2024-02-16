import './assets/css/main.css';
import './assets/css/sidebar.css';
import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard';
import AddQuestions from './pages/AddQuestions';



function App() {

 

  return (
    <div>
      {/* creating routes */}
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element ={<Dashboard />} />
        <Route path="/AddQuestions" element ={<AddQuestions />} />
      </Routes>
    
    </div>
  );
}

export default App;
