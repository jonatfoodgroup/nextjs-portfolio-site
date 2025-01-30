"use client";
import React, { useEffect, useRef } from 'react';
import ServicesSection from './mega-menu/ServicesSection';
import WhatWeThink from './mega-menu/WhatWeThink';

const MegaMenu = ({ activeMenu,  closeMenu }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeMenu]);

  return (
    <div ref={menuRef} className="mega-menu py-4 shadow-2xl border-t-2 border-gray-800 pb-8">
      <div className="mx-auto flex container p-4 lg:px-0" aria-label="Global">
        {/* Conditional rendering for Services menu */}
        {activeMenu === 'services' && (
          <div id="services-menu" className="interior-menu w-full">
            <ServicesSection />
          </div>
        )}
        {/* Conditional rendering for Insights menu */}
        {activeMenu === 'insights' && (
          <div id="insights-menu" className="interior-menu">
            <WhatWeThink />
          </div>
        )}
        {/* Close Button */}
        <div onClick={closeMenu} className="absolute top-0 right-0 p-4 cursor-pointer">
          <span className="text-white">Close</span>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;