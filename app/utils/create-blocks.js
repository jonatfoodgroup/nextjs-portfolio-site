import React from "react";

// Lazy load components for better performance
const Header = React.lazy(() => import("../components/proposals/Header"));
const Summary = React.lazy(() => import("../components/proposals/Summary"));
const Introduction = React.lazy(() => import("../components/proposals/Introduction"));
const Scope = React.lazy(() => import("../components/proposals/Scope"));
const Goals = React.lazy(() => import("../components/proposals/Goals"));
const Assumptions = React.lazy(() => import("../components/proposals/Assumptions"));
const Timeline = React.lazy(() => import("../components/proposals/Timeline"));
const Budget = React.lazy(() => import("../components/proposals/BudgetTable"));
const RelatedProjects = React.lazy(() => import("../components/proposals/RelatedProjects"));
const Signature = React.lazy(() => import("../components/proposals/SignatureForm"));

/**
 * Create blocks dynamically based on the proposal data.
 * @param {Object} proposal - The proposal object.
 * @returns {Array} Array of block objects with id, component, and props.
 */
const createBlocks = (proposal) => {
  const blocks = [
    { id: "header", component: Header, props: { proposal } },
    { id: "summary", component: Summary, props: {} },
    { id: "introduction", component: Introduction, props: {} },
    { id: "scope", component: Scope, props: { proposal } },
    { id: "goals", component: Goals, props: {} },
    { id: "assumptions", component: Assumptions, props: {} },
    { id: "timeline", component: Timeline, props: {} },
    { id: "budget", component: Budget, props: {} },
    { id: "relatedProjects", component: RelatedProjects, props: {} },
    { id: "signature", component: Signature, props: { proposal } },
  ];

  // Example condition: Exclude budget if the proposal has no budget field
  if (!proposal.budget) {
    return blocks.filter((block) => block.id !== "budget");
  }

  return blocks;
};

export default createBlocks;
