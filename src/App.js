// src/App.js
import React from 'react';
import './App.css';
import ARScene from './ARScene';
import Interele from './Interele';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from './Nav';
import UserUpload from './UserUpload';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
    <Router>
      <Routes>
        <Route path = "/" element = {<Interele />}/>
        <Route path="/arscene" element={<ARScene />} />
        <Route path = "/navwebxr" element = {<Nav />}/>
        <Route path = "/userupload" element = {<UserUpload />}/>
      </Routes>
    </Router></div>
  );
}

export default App;
