// Header.js
"use client";
import React, { useEffect, useState } from "react";
import MegaMenu from "./MegaMenu";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Topbar from "./marketing/Topbar";
import { Tooltip } from "react-tooltip";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const router = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Middle menu items definition
  const middleMenuItems = [
    {
      label: "What we do",
      menuName: "services",
      icon: "carbon:ibm-cloud-kubernetes-service"
    },
    {
      label: "What we think",
      menuName: "insights",
      icon: "carbon:machine-learning-model"
    },
    {
      label: "Who we are",
      href: "/who-we-are", // Links directly without toggle
      icon: "carbon:group"
    },
    {
      label: "Portal",
      href: "/portal", // Links directly without toggle
      icon: "carbon:enterprise"
    }
  ];

  const handleMenuToggle = (menuName) => {
    if (menuOpen === false) {
      setActiveMenu(menuName);
    } else {
      if (activeMenu === menuName) {
        closeMenu();
      } else {
        setActiveMenu(menuName);
      }
    }

    if (activeMenu === menuName) {
      setActiveMenu(null);
    }
    
  };

  const closeMenu = () => {
    setMenuOpen(false);
    // setActiveMenu(null);
  };

  useEffect(() => {
    
    closeMenu();
  }, [router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkMode(darkModeQuery.matches);

      const handleChange = (e) => setIsDarkMode(e.matches);
      darkModeQuery.addEventListener("change", handleChange);

      return () => darkModeQuery.removeEventListener("change", handleChange);
    }
  }, []);

  useEffect(() => {
    console.log('menuOpen', activeMenu);
  }, [activeMenu]);

  return (
    <header className="bg-black fixed w-full border-b-2 border-gray-800" style={{ zIndex: 999 }}>
      <Topbar />
      <div className="relative bg-black" style={{ zIndex: 999 }}>
        <nav
          className="mx-auto container flex items-center justify-center md:justify-between py-2 md:py-0"
          aria-label="Global"
        >
          <div className="flex items-center flex-1">
            {/* <Logo /> */}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white relative z-50"
            >
              <span className="sr-only">Open main menu</span>
              <Icon icon="bi:menu" className="h-9 w-8 text-black" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-6">
            {middleMenuItems.map((item, index) =>
              item.href ? (
                <Link
                  key={index}
                  href={item.href}
                  className="text-xs uppercase font-regular leading-6 text-white px-2 py-2 hover:text-orange-500 flex items-center gap-x-2 transition-all duration-200"
                >
                  {/* <Icon icon={item.icon} className="h-6 w-6" /> */}
                  <span>
                  {item.label}
                  </span>
                  
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={() => handleMenuToggle(item.menuName)}
                  className={`flex items-center gap-x-2 text-xl 
                    transition-all duration-200
                    text-xs  font-bold
                    border-b-2 border-transparent
                    leading-6 px-2 py-2 ${
                    activeMenu === item.menuName ? "text-orange-500 font-bold" : "text-white"
                  }`}
                >
                  {/* <Icon icon={item.icon} className="h-6 w-6" /> */}
                  <span>
                  {item.label}
                  </span>
                  <Icon
                    icon={`${activeMenu === item.menuName ? "ic:round-check" : "bi:chevron-down"}`}
                    className="h-2 w-2"
                  />
                </button>
              )
            )}
          </div>
          {/* <NavIcons /> */}
        </nav>
      </div>
      {activeMenu && <MegaMenu activeMenu={activeMenu} closeMenu={closeMenu} />}
    </header>
  );
};

const NavIcons = () => {
  const items = [
    { icon: "carbon:search", onclick: () => console.log("search"), tooltip: "Search StrongStart" },
    { icon: "carbon:bookmark", onclick: () => console.log("bookmark"), tooltip: "Bookmarks" },
    { icon: "carbon:notification", onclick: () => console.log("notification"), tooltip: "Updates" },
    { icon: "carbon:user-avatar", onclick: () => console.log("profile"), tooltip: "Sign In" },
    { icon: "carbon:chat", onclick: () => console.log("chat"), tooltip: "Chat" },
  ];

  return (
    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onclick}
          className="text-md font-semibold p-3 text-orange bg-white flex items-center hover:bg-gray-200 rounded-full"
          data-tooltip-id={item.tooltip}
          data-tooltip-place="bottom"
          data-tooltip-content={item.tooltip}
        >
          {/* <Icon icon={item.icon} className="h-6 w-6" /> */}
          <Tooltip id={item.tooltip} place="bottom" />
        </button>
      ))}
    </div>
  );
};

export default Header;