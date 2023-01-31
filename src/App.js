// import dartboard from 'dartboard.png';
import './App.css';
import Landing from './Landing';
import Mapview from './Mapview';
import Header from './Header';
import StyledMap from './StyledMap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';



function App() {

  useEffect(() => {
    console.log("app")
  }, []);

  return (
    <div className="App">
      <Header />

      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/throw' element={<Mapview />} />
          <Route path='/test' element={<StyledMap />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
