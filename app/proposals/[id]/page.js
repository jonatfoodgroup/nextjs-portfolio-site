"use client";

import React, { useState, useEffect, Suspense, useContext } from "react";
import { ProposalProvider, useProposal } from "../../providers/ProposalProvider";
import Tiptap from "../../components/TipTap";

export default function ProposalPage({ params }) {
  // const stuff = ProposalProvider();
  // const { proposals } = ProposalProvider.getProposal()


  return (

    <Wrapper />
  );
}

const Wrapper = ({ children }) => {
  return (
    <ProposalProvider>
      <TextEditor />
    </ProposalProvider>
  )
}

const TextEditor = () => {
  const { getProposal } = useProposal();

  return (
    <Tiptap />
  )
}