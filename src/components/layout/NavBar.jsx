import React, { useState, useRef, useEffect } from 'react';

// Import your icons as URLs (no 'ReactComponent as' or '?react')
import BellIconUrl from '../../assets/icons/notification.svg';
import ChevronDownIconUrl from '../../assets/icons/chevron-down.svg';

// Your flag and avatar imports (these are already correct for PNGs)
import UkFlag from '../../assets/images/usa.png';
import FrFlag from '../../assets/images/frensh.png';
import ArFlag from '../../assets/images/arabic.png';
import UserAvatar from '../../assets/images/avatar.png';

const Navbar = ({ toggleSidebar }) => {
  // State for language dropdown visibility
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  // State for current language (default to English)
  const [currentLanguage, setCurrentLanguage] = useState({
    code: 'en',
    name: 'English',
    flag: UkFlag,
  });

  // Ref for the language dropdown to detect clicks outside
  const languageDropdownRef = useRef(null);

  // Define available languages
  const languages = [
    { code: 'en', name: 'English', flag: UkFlag },
    { code: 'fr', name: 'Français', flag: FrFlag },
    { code: 'ar', name: 'العربية', flag: ArFlag },
  ];

  // Function to toggle language dropdown
  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen((prev) => !prev);
  };

  // Function to handle language selection
  const handleLanguageSelect = (language) => {
    setCurrentLanguage(language);
    setIsLanguageDropdownOpen(false);
  };

  // Effect to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E5E7EB] shadow-sm h-16">
      {/* Left Section: Hamburger Menu */}
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className="text-[#6B7280] hover:text-[#1F2937] transition-colors duration-150 p-1"
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Right Section: Icons and User Info */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="text-[#6B7280] hover:text-[#1F2937] relative transition-colors duration-150">
          <img src={BellIconUrl} alt="Notifications" className="w-6 h-6" />
        </button>

        {/* Language Selector Dropdown */}
        <div className="relative" ref={languageDropdownRef}>
          <button
            onClick={toggleLanguageDropdown}
            className="flex items-center space-x-2 cursor-pointer text-[#1F2937] hover:text-[#4F46E5] p-2 rounded-md hover:bg-[#F3F4F6] transition-colors duration-150"
          >
            <img src={currentLanguage.flag} alt={`${currentLanguage.name} Flag`} className="w-5 h-5 rounded-full" />
            <span className="text-sm font-medium">{currentLanguage.name}</span>
            <img
              src={ChevronDownIconUrl}
              alt="Dropdown"
              className={`w-4 h-4 text-[#6B7280] transition-transform duration-150 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-1 z-40 border border-[#E5E7EB]">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang)}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-[#1F2937] hover:bg-[#F3F4F6] transition-colors duration-150"
                >
                  <img src={lang.flag} alt={`${lang.name} Flag`} className="w-5 h-5 rounded-full" />
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <img
            src={UserAvatar}
            alt="User Avatar"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="flex flex-col text-sm">
            <span className="font-semibold text-[#1F2937]">MC Donald</span>
            <span className="text-[#6B7280]">Vendor</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

