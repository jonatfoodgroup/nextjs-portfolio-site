"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { ref, onValue } from "firebase/database";
import Signature from "../../components/proposals/SignatureForm";
import TableOfContents from "../../components/proposals/TableOfContents";
import Header from "../../components/proposals/Header";
import Introduction from "../../components/proposals/Introduction";
import Summary from "../../components/proposals/Summary";
import RelatedProjects from "../../components/proposals/RelatedProjects";
import Scope from "../../components/proposals/Scope";
import Budget from "../../components/proposals/BudgetTable";
import Goals from "../../components/proposals/Goals";
import Assumptions from "../../components/proposals/Assumptions";
import Timeline from "../../components/proposals/Timeline";

export default function ProposalPage({ params }) {
  const [proposal, setProposal] = useState({});
  const [loading, setLoading] = useState(true);
  const [tocIsOpen, setTocIsOpen] = useState(false);

  useEffect(() => {
    const dbRef = ref(db, `proposals/${params.id}`);
    onValue(dbRef, (snapshot) => {
      let prop = snapshot.val();
      prop.id = params.id;
      setProposal(prop);
      setLoading(false);
    });

  }, []);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (!proposal) {
    return <div>Proposal not found</div>;
  }

  return (
    <div className="relative bg-background w-full min-h-screen">
      <div className="container mx-auto md:px-4 px-0">
        <Header proposal={proposal} />
      </div>
      <Summary />
      <Introduction />
      <Scope proposal={proposal} />
      <Goals />
      <Assumptions />
      <Timeline />
      <Budget />
      <RelatedProjects />
      <Signature proposal={proposal} />
      <TableOfContents isOpen={tocIsOpen} setIsOpen={setTocIsOpen} />
    </div>
  );
}



