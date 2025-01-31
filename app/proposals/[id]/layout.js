"use client";
import React from "react";

export default function ProposalLayout({ children }) {
  return (
    <div className="proposal-layout bg-white min-h-screen">
      <Header />
      <main className="mt-16">{children}</main>
      {/* Custom footer or additional layout elements */}
    </div>
  );
}

const Header = () => {
  const print = () => {
    window.print();
  }
  return (
    <header className="proposal-header fixed top-0 left-0 right-0 z-50 bg-gray-100 shadow-md h-16">
      <div className="container mx-auto px-6 flex items-center justify-between h-full">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-900">StrongStart</div>

        {/* Navigation (customize as needed) */}
        <nav className="hidden md:flex space-x-6">
          <a href="/dashboard" className="text-gray-700 hover:text-blue-600 transition">Dashboard</a>
          <a href="/proposals" className="text-gray-700 hover:text-blue-600 transition">Proposals</a>
          <a href="/settings" className="text-gray-700 hover:text-blue-600 transition">Settings</a>
        </nav>

        {/* User Profile or Actions */}
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            New Proposal
          </button>
          <button onClick={print} className="text-gray-700 hover:text-blue-600 transition">
            Print
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            {/* Placeholder for Profile Image */}
            <span className="text-gray-700 font-semibold">JS</span>
          </div>
        </div>
      </div>
    </header>
  );
};