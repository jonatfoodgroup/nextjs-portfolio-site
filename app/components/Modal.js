'use client';
import React, { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, title, children, footer }) {
  const ref = useRef();

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Close modal on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && isOpen) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside); // Use 'mousedown' instead of 'click'
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative w-full max-w-3xl mx-4 p-8 bg-gray-800 rounded-lg shadow-lg"
        ref={ref}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-regular text-gray-300">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close Modal"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="text-gray-700">{children}</div>

        {/* Footer */}
        {footer && <div className="flex justify-end p-4 border-t">{footer}</div>}
      </div>
    </div>
  );
}