"use client";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  useEffect(() => {
    const elements = document.querySelectorAll("a, button");
  
    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);
  
    const updateEventListeners = () => {
      // Clean up existing listeners
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
  
      // Reselect elements and attach listeners
      const updatedElements = document.querySelectorAll("a, button");
      updatedElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };
  
    // Attach initial listeners
    elements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });
  
    // Observe DOM changes
    const observer = new MutationObserver(updateEventListeners);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  
    // Cleanup on unmount
    return () => {
      observer.disconnect();
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div>
      <div
        className={`custom-cursor ${hovered ? "hovered" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <style jsx>{`
        .custom-cursor {
          position: fixed;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          pointer-events: none;
          background: transparent;
          border: 1px solid rgba(0, 0, 0, 0.2);
          transform: translate(-50%, -50%);
          z-index: 9999;
          transition: transform 0.15s ease, width 0.15s ease, height 0.15s ease;
        }
        .custom-cursor.hovered {
          transform: translate(-50%, -50%) scale(1.5);
          background: rgba(255, 86, 1, 0.5);
          border: none;
        }
      `}</style>
    </div>
  );
};

export default CustomCursor;