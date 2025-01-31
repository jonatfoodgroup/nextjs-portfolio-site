"use client";

import React, { useState, useEffect } from "react";
import { ProposalProvider, useProposal } from "../../providers/ProposalProvider";
import Tiptap from "../../components/TipTap";
import SignaturePad from "../../components/SignaturePad";

export default function ProposalPage({ params }) {
  return (
    <ProposalProvider>
      <div className="container mx-auto py-10 px-6 max-w-5xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Proposal Editor</h1>
        <p className="text-gray-700 mb-6">
          This section allows you to review, edit, and sign the proposal before submission. Click "Full-Screen Editor" for a distraction-free editing experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <TextEditor />
          </div>
          <div className="md:col-span-1">
            <SignatureSection />
          </div>
        </div>
      </div>
    </ProposalProvider>
  );
}

// TextEditor Component with Full-Screen Modal
const TextEditor = () => {
  const { getProposal } = useProposal();
  const [isFullScreen, setIsFullScreen] = useState(false);

  // press escape to close the modal
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="p-6 bg-white shadow-md rounded-md border border-gray-200 relative">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">Document</h2>
          <button
            className="text-blue-500 hover:text-blue-700 text-sm"
            onClick={() => setIsFullScreen(true)}
          >
            Full-Screen Editor
          </button>
        </div>
        <Tiptap />
      </div>

      {isFullScreen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-start justify-center z-50">
          <div className="bg-white w-full h-screen p-6 shadow-lg rounded-md overflow-y-auto max-h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Editing Proposal</h2>
              <button
                className="text-red-500 hover:text-red-700 text-sm"
                onClick={() => setIsFullScreen(false)}
              >
                Close
              </button>
            </div>
            <Tiptap />
          </div>
        </div>
      )}
    </>
  );
};

// Signature Section Component
const SignatureSection = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md border border-gray-200 flex flex-col items-center">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Signature</h2>
      <p className="text-gray-600 text-sm text-center mb-3">
        Please sign below to finalize the proposal.
      </p>
      <SignaturePad />
    </div>
  );
};