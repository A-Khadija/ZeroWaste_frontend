import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarLink = ({ iconUrl, text, to, isCollapsed, onLinkClick }) => {
  const baseClasses = "flex items-center px-3 py-3 rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1F2937] transition-all duration-150 ease-in-out";
  const activeClasses = "bg-[#FF9D13] text-white hover:bg-[#FF9D13]";

  const handleClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <li className="relative">
      <NavLink
        to={to}
        onClick={handleClick}
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : ''} w-full text-left ${
            isCollapsed ? 'justify-center' : ''
          }`
        }
        end={to === "/"}
        title={isCollapsed ? text : undefined}
      >
        {({ isActive }) => (
          <>
            {/* Render an <img> tag with the iconUrl */}
            {iconUrl && (
              <img
                src={iconUrl}
                alt={text}
                className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} ${
                  isActive ? 'filter brightness-0 invert' : ''
                }`}
              />
            )}
            {!isCollapsed && (
              <span className="font-medium text-sm">{text}</span>
            )}
          </>
        )}
      </NavLink>
    </li>
  );
};

export default SidebarLink;

