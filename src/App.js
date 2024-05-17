import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes, // Importa Routes
  Route
} from "react-router-dom";
import Home from './Components/Home'
import Clientes from './Components/Clientes';
import NuevoCliente from './Components/NuevoCliente';
import EditCliente from './Components/EditCliente';

function App() {
  return (
    <Router>
      <Routes> 
        <Route  path="/" element={<Home />} /> 
        <Route  path="/clientes" element={<Clientes />} /> 
        <Route  path="/nuevo-cliente" element={<NuevoCliente />} /> 
        <Route path="/cliente/:id" element={<EditCliente />} /> 
      </Routes>
    </Router>
  );
}

export default App;
