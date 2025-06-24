import React, { useState } from 'react';
import SidebarLink from './SidebarLink';

// Import your actual SVG icons as URLs (no ?react, no ReactComponent)
import DashboardIcon from '../../assets/icons/dashboard.svg';
import ProductsIcon from '../../assets/icons/product.svg';
import InboxIcon from '../../assets/icons/inbox.svg';
import OrderListsIcon from '../../assets/icons/list-orders.svg'; // Assuming 'list.svg' for Order Lists
import CalendarIcon from '../../assets/icons/calendar.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import LogoutIcon from '../../assets/icons/logout.svg';

const Sidebar = ({ isOpen, toggleSidebar, onLinkClick }) => {
  const [activeLink, setActiveLink] = useState('Dashboard'); // This state is now redundant if using React Router's NavLink

  const menuItems = [
    { id: 'Dashboard', text: 'Dashboard', iconUrl: DashboardIcon, to: '/' },
    { id: 'Products', text: 'Products', iconUrl: ProductsIcon, to: '/products' },
    { id: 'Inbox', text: 'Inbox', iconUrl: InboxIcon, to: '/inbox' },
    { id: 'Order Lists', text: 'Order Lists', iconUrl: OrderListsIcon, to: '/order-lists' },
  ];

  const pageItems = [
    { id: 'Calendar', text: 'Calendar', iconUrl: CalendarIcon, to: '/calendar' },
    { id: 'Settings', text: 'Settings', iconUrl: SettingsIcon, to: '/settings' },
    { id: 'Logout', text: 'Logout', iconUrl: LogoutIcon, to: '/logout' },
  ];

  // Check if screen is large
  const isLargeScreen = () => window.innerWidth >= 1024;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 bg-white border-r border-[#E5E7EB] shadow-sm
        transition-all duration-300 ease-in-out
        ${isOpen 
          ? 'w-64' 
          : isLargeScreen() 
            ? 'w-16' 
            : '-translate-x-full w-64'
        }
        ${!isOpen && isLargeScreen() ? 'translate-x-0' : ''}
        ${isOpen ? 'translate-x-0' : ''}
        lg:static lg:inset-0`}
    >
      {/* Logo - Bold and Centered */}
      <div className="flex items-center justify-center px-4 py-6 border-[#E5E7EB]">
        {isOpen ? (
          <h1 className="text-xl font-bold text-[#1F2937] text-center">
            Leftover<span className="text-[#FF9D13]">.</span>
          </h1>
        ) : (
          <div className="w-8 h-8 bg-[#FF9D13] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
        )}
      </div>

      {/* Main Menu Items */}
      <nav className="mt-6 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <SidebarLink
              key={item.id}
              iconUrl={item.iconUrl}
              text={item.text}
              to={item.to}
              isCollapsed={!isOpen}
              onLinkClick={onLinkClick}
            />
          ))}
        </ul>
      </nav>

      {/* Pages Section */}
      <div className="mt-8 pt-6 border-t border-[#E5E7EB] px-3">
        {isOpen && (
          <h2 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">PAGES</h2>
        )}
        <nav>
          <ul className="space-y-1">
            {pageItems.map((item) => (
              <SidebarLink
                key={item.id}
                iconUrl={item.iconUrl}
                text={item.text}
                to={item.to}
                isCollapsed={!isOpen}
                onLinkClick={onLinkClick}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

