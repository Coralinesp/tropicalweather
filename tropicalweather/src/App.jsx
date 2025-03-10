import React from 'react';
import './css/App.css'
import Navbar from './Components/Navbar.jsx';
import Home from './Pages/Home'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Importar Router correctamente

function App() {
  return (
    <Router>
      <div className='main-container'>
      <Navbar /> 
      <div className='content'> 
         <Routes>
          <Route path="/inicio" element={<Home />} />
        </Routes>
      </div>   
      </div>
    </Router>
  );
}

export default App;
