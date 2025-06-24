// import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Sidebar from './components/layout/sidebar';
// import Navbar from './components/layout/NavBar';
// import DashboardPage from './pages/Dashboard';
// import ProductsPage from './pages/Products';
// import SettingsPage from './pages/Settings';
// // Import other page components as needed

// function App() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex h-screen bg-[#F8FAFC]">
//       {/* Sidebar */}
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Overlay for mobile when sidebar is open */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )}

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Navbar Component */}
//         <Navbar toggleSidebar={toggleSidebar} />

//         {/* Main Page Content */}
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F8FAFC] ml-0  p-8">
//           <Routes>
//             <Route path="/" element={<DashboardPage />} />
//             <Route path="/products" element={<ProductsPage />} />
//             <Route path="/settings" element={<SettingsPage />} />
//             {/* Add more routes for other pages */}
//             <Route path="*" element={<div className="p-6 text-center text-gray-600">404 - Page Not Found</div>} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/sidebar';
import Navbar from './components/layout/NavBar';
import DashboardPage from './pages/Dashboard';
import ProductsPage from './pages/Products';
import SettingsPage from './pages/Settings';
// Import other page components as needed

function App() {
  // Initialize sidebar state based on screen size
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to check if screen is large (lg breakpoint)
  const isLargeScreen = () => window.innerWidth >= 1024;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to handle link clicks on mobile
  const handleMobileLinkClick = () => {
    if (!isLargeScreen()) {
      setIsSidebarOpen(false);
    }
  };

  // Set initial sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (isLargeScreen()) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
        onLinkClick={handleMobileLinkClick}
      />

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && !isLargeScreen() && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar Component */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Main Page Content */}
        <main className={`flex-1 overflow-x-hidden overflow-y-auto bg-[#F8FAFC] p-8 transition-all duration-300 ${
          isLargeScreen() && isSidebarOpen ? 'ml-0' : isLargeScreen() && !isSidebarOpen ? 'ml-16' : 'ml-0'
        }`}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* Add more routes for other pages */}
            <Route path="*" element={<div className="p-6 text-center text-gray-600">404 - Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;

