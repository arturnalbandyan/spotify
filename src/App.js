import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Artists from './pages/Artists';
import Albums from "./pages/Albums";
import Tracks from "./pages/Tracks";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/artists" element={<Artists />} />
        <Route exact path="/albums/:id" element={<Albums />} />
        <Route exact path="/tracks/:id" element={<Tracks />} />
      </Routes>
    </Router>
  );
}

export default App;
