import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/Layout/DashboardLayout';
import Portfolio from './pages/Portfolio';
import HeroBuilder from './pages/HeroBuilder';
import About from './pages/About';
import Education from './pages/Education';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<HeroBuilder />} />
          <Route path="hero-builder" element={<HeroBuilder />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="about" element={<About />} />
          <Route path="education" element={<Education />} />
          <Route path="experience" element={<Experience />} />
          <Route path="skills" element={<Skills />} />
          <Route path="contact" element={<Contact />} />
          <Route path="testimonials" element={<Testimonials />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
