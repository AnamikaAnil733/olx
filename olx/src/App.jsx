import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sign from './pages/Signup';
import Signin from './pages/Login';
import Form from './pages/Create';
import ViewPost from './pages/ViewPost';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Sign />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/Create" element={<Form />} />
          <Route path="/view/:id" element={<ViewPost />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
