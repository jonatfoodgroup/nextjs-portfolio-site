// Header.js
"use client";
import React, { useEffect, useState } from 'react';
import MegaMenu from './MegaMenu';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

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
    <header className="bg-background fixed w-full z-50 border-b-2 border-primary">
      <div className="relative bg-background" style={{ zIndex: 999 }}>
        <nav className="mx-auto container flex items-center justify-between py-4" aria-label="Global">
          <div className="flex items-center flex-1">
            <Logo />
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-4">
            <button
              onClick={() => handleMenuToggle('services')}
              className={`flex items-center gap-x-1 text-md leading-6  px-2 py-2 hover:text-blue-500 ${activeMenu === 'services' ? 'text-blue-500 font-bold' : 'text-foreground font-semibold'}`}
            >
              What we do
              <Icon icon={`${activeMenu === 'services' ? 'ic:round-check' : 'bi:chevron-down'}`} className="h-2 w-2" />
            </button>
            <button
              onClick={() => handleMenuToggle('insights')}
              className={`flex items-center gap-x-1 text-md leading-6  px-2 py-2 hover:text-blue-500 ${activeMenu === 'insights' ? 'text-blue-500 font-bold' : 'text-foreground font-semibold'}`}
>
              What we think
              <Icon icon="bi:chevron-down" className="h-2 w-2" />
            </button>
            <Link href="/company" 
            
            className="text-md font-semibold leading-6 text-foreground px-2 py-2 hover:text-blue-500 hover:font-bold">
              Who we are
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/contact-us" className="text-sm font-semibold leading-6 px-6 py-2 text-white bg-black hover:bg-black flex items-center gap-x-2">
              <Icon icon="uiw:mail-o" className="h-4 w-4" />
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
      {menuOpen && <MegaMenu activeMenu={activeMenu} closeMenu={closeMenu} />}
    </header>
  );
};

export default Header;