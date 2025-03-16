import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/hero';
import CategoryPage from './components/categoryPage';
import LoginPage from './components/LoginPage';  // Import LoginPage component
import Dashboard from './components/Dashboard';  // Import Dashboard component (user's dashboard)
import PlumberPage from './components/plumberPage';  // Plumber category page
import ElectricianPage from './components/ElectricianPage';  // Electrician category page
import CleanerPage from './components/CleanerPage';  // Cleaner category page
import PainterPage from './components/PainterPage';  // Painter category page
import ShiftingPage from './components/ShiftingPage';  // Shifting category page

function App() {
  return (
    <Router>
      <div>
        {/* Header is shown on all pages */}
        <Header />

        {/* Hero section displayed only on the homepage */}
        <Hero />

        {/* Define the routes for your app */}
        <Routes>
          {/* Home Page: Category page with different categories */}
          <Route path="/" element={<CategoryPage />} />
          
          {/* Login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Dashboard page for logged-in users or service providers */}
          <Route path="/dashboard" element={<Dashboard />} />

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
