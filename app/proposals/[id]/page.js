"use client";

import React, { useState, useEffect, useContext } from "react";
import { ProposalProvider, useProposal } from "../../providers/ProposalProvider";
import Tiptap from "../../components/TipTap";

export default function ProposalPage({ params }) {
  return (
    <Wrapper />
  );
}

const Wrapper = ({ children }) => {
  return (
    <ProposalProvider>
      <div className="container mx-auto py-10">
      <TextEditor />
      </div>
    </ProposalProvider>
  )
}

const TextEditor = () => {
  const { getProposal } = useProposal();

  return (
    <Tiptap />
  )
}