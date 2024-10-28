"use client";
import React, { useEffect, useRef } from 'react';
import ServicesSection from './mega-menu/ServicesSection';

const MegaMenu = ({ activeMenu, closeMenu }) => {
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
    <div ref={menuRef} className="mega-menu bg-background shadow-3xl py-8 border-t-2 border-b-2 border-primary">
      <div className="mx-auto flex max-w-7xl p-4 lg:px-8" aria-label="Global">
        {activeMenu === 'services' && (
          <div id="services-menu" className="interior-menu">
            <ServicesSection />
          </div>
        )}
        {activeMenu === 'insights' && (
          <div id="insights-menu" className="interior-menu">
            <h4 className="text-xl font-bold mt-0">Insights</h4>
            <ul>
              <li><a href="/insight1">Insight 1</a></li>
              <li><a href="/insight2">Insight 2</a></li>
              <li><a href="/insight3">Insight 3</a></li>
            </ul>
          </div>
        )}
        <div onClick={closeMenu} className="absolute top-0 right-0 p-4 cursor-pointer">
          <span className="text-white">Close</span>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;