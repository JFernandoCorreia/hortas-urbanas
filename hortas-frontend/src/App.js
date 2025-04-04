import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MapaHortas from './pages/MapaHortas';
import Inscricao from './pages/Inscricao';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DicasPage from './pages/DicasPage';
import SobrePage from './pages/SobrePage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mapa-hortas" element={<MapaHortas />} />
          <Route path="/inscricao" element={<Inscricao />} />
          <Route path="/dicas" element={<DicasPage />} />
          <Route path="/sobre" element={<SobrePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
