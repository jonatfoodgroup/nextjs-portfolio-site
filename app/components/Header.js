// Header.js
"use client";
import React, { useEffect, useState } from 'react';
import MegaMenu from './MegaMenu';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import Topbar from './marketing/Topbar';
import { Tooltip } from "react-tooltip";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const router = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);


  const handleMenuToggle = (menuName) => {
    if (menuOpen && activeMenu === menuName) {
      closeMenu();
    } else {
      setMenuOpen(true);
      setActiveMenu(menuName);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveMenu(null);
  }

  useEffect(() => {
    closeMenu();
  }, [router]);

  useEffect(() => {
    // Make sure the code runs only on the client side
    if (typeof window !== 'undefined') {
      // Check if the user prefers dark mode
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Set initial state
      setIsDarkMode(darkModeQuery.matches);
      
      // Watch for changes in color scheme preference
      const handleChange = (e) => {
        console.log('Dark mode:', e.matches);
        setIsDarkMode(e.matches);
      };

      darkModeQuery.addEventListener('change', handleChange);

      // Clean up event listener on component unmount
      return () => darkModeQuery.removeEventListener('change', handleChange);
    }
  }, []);


  return (
    <header className="bg-white fixed w-full border-b-2 border-primary" style={{zIndex: 999}}>
      {/* <Topbar /> */}
      <div className="relative bg-white" style={{ zIndex: 999 }}>
        <nav className="mx-auto container flex items-center justify-center md:justify-between py-2 md:py-4" aria-label="Global">
          <div className="flex items-center flex-1">
            <Logo />
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black relative z-50"
            >
              <span className="sr-only">Open main menu</span>
             <Icon icon="bi:menu" className="h-6 w-6 text-black" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-4">
            <button
              onClick={() => handleMenuToggle('services')}
              className={`flex items-center gap-x-1 text-xl leading-6  px-2 py-2 hover:text-orange-500 ${activeMenu === 'services' ? 'text-orange-500 font-bold' : 'text-black font-bold'}`}
            >
              What we do
              <Icon icon={`${activeMenu === 'services' ? 'ic:round-check' : 'bi:chevron-down'}`} className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleMenuToggle('insights')}
              className={`flex items-center gap-x-1 text-xl leading-6  px-2 py-2 hover:text-orange-500 ${activeMenu === 'insights' ? 'text-orange-500 font-bold' : 'text-black font-bold'}`}
>
              What we think
              <Icon icon={`${activeMenu === 'insights' ? 'ic:round-check' : 'bi:chevron-down'}`} className="h-4 w-4" />
            </button>
            
            <Link href="/who-we-are"
              className="text-xl font-bold leading-6 text-black px-2 py-2">
              Who we are
            </Link>
          </div>
          <NavIcons />
        </nav>
      </div>
      {menuOpen && <MegaMenu activeMenu={activeMenu} closeMenu={closeMenu} />}
    </header>
  );
};

const NavIcons = () => {
  let items = [
    { icon: 'carbon:search', onclick: () => console.log('search'), tooltip: 'Search' },
    { icon: 'carbon:user-avatar', onclick: () => console.log('profile'), tooltip: 'Profile' },
    { icon: 'carbon:chat', onclick: () => console.log('chat'), tooltip: 'Chat' },
  ];

  return (
    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      {items.map((item, index) => (
        <button key={index} onClick={item.onclick} className="text-md font-semibold p-3 text-orange bg-white flex items-center hover:bg-gray-200 rounded-full" data-tooltip-id={item.tooltip} data-tooltip-place="bottom" data-tooltip-content={item.tooltip}>
          <Icon icon={item.icon} className="h-6 w-6" />
          <Tooltip id={item.tooltip} place="bottom" />
        </button>
      ))}
    </div>
  )
}

export default Header;