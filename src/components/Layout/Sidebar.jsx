import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { path: '/hero-builder', label: 'Hero Builder', icon: '🎨' },
    { path: '/about', label: 'About', icon: '👤' },
    { path: '/education', label: 'Education', icon: '🎓' },
    { path: '/experience', label: 'Experience', icon: '💼' },
    { path: '/skills', label: 'Skills', icon: '🧠' },
    { path: '/contact', label: 'Contact', icon: '✉️' },
    { path: '/testimonials', label: 'Testimonials', icon: '⭐' },
    { path: '/portfolio', label: 'Portfolio', icon: '💼' },

  ];

  return (
    <div className="w-64 bg-cardBg text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary mb-8">CMS Amber</h1>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
        <div className="text-sm text-gray-400">
          <p>CMS Amber v1.0</p>
          <p>Content Management System</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
