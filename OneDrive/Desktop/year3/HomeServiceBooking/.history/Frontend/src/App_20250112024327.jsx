import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import CategoryPage from './components/CategoryPage'
import PlumberPage from './components/plumberPage'
import ElectricianPage from './components/ElectricianPage'
import CleanerPage from './components/CleanerPage'
import PainterPage from './components/PainterPage'
import ShiftingPage from './components/ShiftingPage'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Hero />
        
        {/* Define Routes here */}
        <Routes>
          <Route path="/" element={<CategoryPage />} />
          <Route path="/category/plumber" element={<PlumberPage />} />
          <Route path="/category/electrician" element={<ElectricianPage />} />
          <Route path="/category/cleaner" element={<CleanerPage />} />
          <Route path="/category/painter" element={<PainterPage />} />
          <Route path="/category/shifting" element={<ShiftingPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
