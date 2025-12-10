import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import CreateRunner from './pages/CreateRunner';
import ManageRunner from './pages/ManageRunner';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateRunner />} />
        <Route path="/manage" element={<ManageRunner />} />
      </Routes>
    </div>
  );
}

export default App;
