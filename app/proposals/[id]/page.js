"use client";

import React, { useState, useEffect, Suspense } from "react";
import { db } from "../../firebase/config";
import { ref, get } from "firebase/database";
import createBlocks from "../../utils/create-blocks";
import TableOfContents from "../../components/proposals/TableOfContents";

export default function ProposalPage({ params }) {
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tocIsOpen, setTocIsOpen] = useState(false);
  const [blocks, setBlocks] = useState([]);

  // Fetch proposal data from Firebase
  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const snapshot = await get(ref(db, `proposals/${params.id}`));
        const prop = snapshot.val();

        if (prop) {
          prop.id = params.id; // Attach the ID to the proposal
          setProposal(prop);
        } else {
          setProposal(null);
        }
      } catch (error) {
        console.error("Error fetching proposal:", error);
        setProposal(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [params.id]);

  // Generate blocks once proposal is fetched
  useEffect(() => {
    if (proposal) {
      setBlocks(createBlocks(proposal));
    }
  }, [proposal]);

  // Loading or error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!proposal) {
    return <div>Proposal not found</div>;
  }

  return (
    <div className="relative bg-white w-full min-h-screen">
      <div className="container mx-auto md:px-4 px-0">
        <Suspense fallback={<div>Loading block...</div>}>
          {blocks.map((block) => {
            const Component = block.component;
            return <Component key={block.id} {...block.props} />;
          })}
        </Suspense>
        <TableOfContents isOpen={tocIsOpen} setIsOpen={setTocIsOpen} />
      </div>
    </div>
  );
}
