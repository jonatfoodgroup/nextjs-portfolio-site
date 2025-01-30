"use client";
import React, {useState,useEffect} from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const TableOfContents = ({ isOpen, setIsOpen }) => {
    const [active, setActive] = useState(null);
    const data = [
      { title: "Summary", id: "Summary" },
      { title: "Introduction", id: "Introduction" },
      { title: "Goals", id: "Goals" },
      { title: "Scope", id: "Scope" },
      { title: "Assumptions", id: "Assumptions" },
      { title: "Timeline", id: "Timeline" },
      { title: "Budget", id: "Budget" },
      { title: "Related Projects", id: "RelatedProjects" },
      { title: "Signature", id: "Signature" },
    ];
  
    const handleClick = (id) => {
      const el = document.getElementById(id);
      el.scrollIntoView({ behavior: "smooth" });
    };
  
    // scrollspy
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = (typeof window !== "undefined" && window.scrollY) || 0;
        const el = data.find((item) => {
          const section = document.getElementById(item.id);
          if (!section) {
            return null;
          }
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          return scrollPosition >= top && scrollPosition < bottom;
        });
  
        if (el) {
          setActive(el.id);
        }
      };
  
      if (typeof window !== "undefined") {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }
    }, []);
  
    return (
      <>
        <button
          className="fixed top-1 left-0 p-4 bg-white px-4 py-2 rounded flex flex-row gap-4 text-gray-600 hover:text-blue-500 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon icon="mdi:table-of-contents" width="24" height="24" />
          Table of Contents
        </button>
        <div
          className={`fixed top-1 left-0 h-full md:w-[300px] bg-white shadow-lg w-full p-8 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <button
            className="bg-white text-foreground px-4 py-2 rounded"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
          <h2 className="text-3xl font-semibold">Table of Contents</h2>
          <ul className="mt-8">
            {data.map((item, index) => (
              <li
                key={index}
                className={`text-lg py-2 hover:text-blue-500 cursor-pointer ${
                  active === item.id
                    ? "text-blue-500 font-semibold"
                    : "text-gray-500"
                }`}
                onClick={() => handleClick(item.id)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };

export default TableOfContents;