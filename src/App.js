import React from 'react';
import './App.css';
import Interele from './Interele';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from './Nav';
import Camera from './camera';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
    <Router>
      <Routes>
        <Route path = "/" element = {<Interele />}/>
        <Route path = "/navwebxr" element = {<Nav />}/>
        <Route path = "/camera" element = {<Camera />}/>
      </Routes>
    </Router></div>
  );
}

export default App;
