import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/hero';
import CategoryPage from './components/categoryPage';
import LoginPage from './components/LoginPage';  // Import LoginPage component
import PlumberPage from './components/plumberPage';  // Plumber category page
import ElectricianPage from './components/ElectricianPage';  // Electrician category page
import CleanerPage from './components/CleanerPage';  // Cleaner category page
import PainterPage from './components/PainterPage';  // Painter category page
import ShiftingPage from './components/ShiftingPage';  // Shifting category page

function App() {
  return (
    <Router>
      <Router>
      <div>
        <Header />
        <Hero />
        <Routes>
      <div>
        {/* Header is shown on all pages */}
        <Header />

        {/* Conditionally render Hero section only on the homepage */}
        <Routes>
          <Route path="/" element={<Hero />} />
        </Routes>

        {/* Define the routes for your app */}
        <Routes>
          {/* Home Page: Category page with different categories */}
          <Route path="/" element={<CategoryPage />} />
          
          {/* Login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Individual category pages */}
          <Route path="/plumber" element={<PlumberPage />} />
          <Route path="/electrician" element={<ElectricianPage />} />
          <Route path="/cleaner" element={<CleanerPage />} />
          <Route path="/painter" element={<PainterPage />} />
          <Route path="/shifting" element={<ShiftingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
