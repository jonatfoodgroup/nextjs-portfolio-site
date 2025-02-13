"use client";
import React, { useEffect, useState } from "react";
import MegaMenu from "./MegaMenu";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import Logo from "./Logo/index.js";
import Topbar from "./marketing/Topbar";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  let menuCloseTimeout = null;

  const middleMenuItems = [
    { label: "Service List", menuName: "services", icon: "carbon:ibm-cloud-kubernetes-service" },
    // { label: "What we think", menuName: "insights", icon: "carbon:machine-learning-model" },
    // { label: "Who we are", href: "/who-we-are", icon: "carbon:group" },
    // { label: "Portal", href: "/portal", icon: "carbon:enterprise" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkMode(darkModeQuery.matches);
      darkModeQuery.addEventListener("change", (e) => setIsDarkMode(e.matches));
      return () => darkModeQuery.removeEventListener("change", (e) => setIsDarkMode(e.matches));
    }
  }, []);

  // Handle mouse enter (Open menu)
  const handleOnClick = (menuName) => {
    clearTimeout(menuCloseTimeout); // Cancel any scheduled close
    setActiveMenu(menuName);
  };

  // Handle mouse leave (Close menu after a delay)
  const handleMouseLeave = () => {
    menuCloseTimeout = setTimeout(() => {
      setActiveMenu(null);
    }, 300); // Delay for smooth UX
  };

  return (
    <header className="bg-black fixed w-full border-b-2 border-gray-800 z-50">
      <Topbar />
      <div className="relative bg-black z-50">
        <nav
          className="mx-auto container flex items-center justify-between py-2"
          aria-label="Global"
          onMouseLeave={handleMouseLeave} // Close menu smoothly when mouse leaves nav
        >

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="p-2.5 text-white rounded-md relative z-50">
              <Icon icon="bi:menu" className="h-9 w-8 text-white" />
            </button>
          </div>



          {/* Left: Logo */}
          <div className="flex items-center flex-1">
            <Logo />
            {/* Center Navigation Links */}
            <div className="hidden lg:flex lg:gap-x-6 ml-6">
              {middleMenuItems.map((item, index) =>
                item.href ? (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-md uppercase font-medium text-white px-2 py-2 hover:text-orange-500 transition-all duration-200 flex items-center gap-x-2"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div
                    key={index}
                    className="relative shiny-button text-md uppercase font-medium text-white px-2 py-2 hover:text-orange-500 transition-all duration-200 flex items-center gap-x-2"
                    onClick={() => handleOnClick(item.menuName)} // Open menu on click
                  >
                    <button
                      className={`flex items-center gap-x-2 text-xs font-bold px-2 py-2 border-b-2 border-transparent transition-all duration-200
                      ${activeMenu === item.menuName ? "text-orange-500 border-orange-500" : "text-white"}`}
                    >
                      {item.label}
                      <Icon icon={activeMenu === item.menuName ? "ic:round-check" : "bi:chevron-down"} className="h-2 w-2" />
                    </button>
                    <div className="shiny-effect"></div>
                  </div>
                )
              )}
            </div>
          </div>




          {/* Right Side Navigation Icons & "Let's Connect" Button */}
          <NavIcons />
        </nav>
      </div>

      {/* Mega Menu (Only appears when hovered) */}
      {activeMenu && (
        <div
          className={`absolute left-0 w-full bg-black bg-opacity-95 backdrop-blur-sm z-50 shadow-lg border-t-2 border-gray-800
            text-white transition-all duration-300 ease-in-out 
            ${activeMenu ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          onMouseEnter={() => clearTimeout(menuCloseTimeout)} // Keep open on hover
          onMouseLeave={handleMouseLeave} // Close when mouse leaves
        >
          <MegaMenu activeMenu={activeMenu} closeMenu={() => setActiveMenu(null)} />
        </div>
      )}
    </header>
  );
};

// Navigation Icons + "Let's Connect" Button
const NavIcons = () => {
  return (
    <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-6">
      <button className="px-5 py-2 bg-orange text-white rounded-md hover:bg-blue-700 transition shadow-md flex items-center gap-2">
        <Icon icon="carbon:chat" className="h-5 w-5" />
        <Link href="sms:+13525551234?body=Hi%20there,%20I%20found%20your%20listings%20and%20I'd%20love%20to%20connect!">
          Let’s Connect
        </Link>
      </button>
    </div>
  );
};

export default Header;