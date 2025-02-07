"use client";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, onClose, title, children, footer }) {
  const ref = useRef();

  // Close modal on Escape key press
  useEffect(() => {
    // scroll to top of the page
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Close modal on click outside
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && isOpen) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }} // Smoother backdrop fade
        >
          <motion.div
            className="fixed right-0 w-full h-full max-w-5xl max-h-full p-6 bg-gray-800 rounded-none shadow-lg overflow-y-auto md:rounded-lg md:w-full md:h-full"
            ref={ref}
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth open & close
          >
            {/* Header */}
            <div className="flex items-center justify-between sticky top-0 bg-gray-800 z-10 p-4 border-b border-gray-700">
              <h3 className="text-xl md:text-3xl font-regular text-gray-300">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close Modal"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="text-gray-300 p-4">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="flex justify-end p-4 border-t border-gray-700 sticky bottom-0 bg-gray-800">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}