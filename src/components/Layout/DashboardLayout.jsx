import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavigation from './TopNavigation';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col">
        <TopNavigation />
        <main className="ml-64 p-6">
          <Toaster position="top-right" />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
