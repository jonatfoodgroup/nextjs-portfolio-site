"use client";
import { motion } from "framer-motion";
import { useBounties } from "../../providers/BountyProvider";
import Modal from "../Modal";
import React from "react";
import BountyDetails from "./BountyDetails";
import { useSession } from "next-auth/react";

export default function BountyCardList() {
    const [showModal, setShowModal] = React.useState(false);
    const [selectedBounty, setSelectedBounty] = React.useState(null);
    const { bounties } = useBounties();
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>;
    }
    return (
        <div className="bg-transparent min-h-screen">
            <div className="container mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {bounties.length > 0 ? (
                    bounties.map((bounty, index) => (
                        <motion.div
                            key={bounty.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 hover:bg-gray-700 transition"
                        >
                            {/* if you are the claimedBy view */}
                            {bounty.claimedBy && bounty.claimedBy === session.user.id && (
                                <div className="bg-green-600 text-white p-2 rounded-md">
                                    <p>You have claimed this bounty</p>
                                </div>
                            )}
                            <h3 className="text-lg font-semibold text-blue-400 mb-2">
                                <button
                                    onClick={() => {
                                        setSelectedBounty(bounty);
                                        setShowModal(true);
                                    }}
                                >
                                    {bounty.name}
                                </button>
                            </h3>
                            
                            {/* if someone else has claimed the bounty */}
                            <p className="text-gray-400 text-sm">Start: {bounty.startDate}</p>
                            <p className="text-gray-400 text-sm">End: {bounty.endDate}</p>
                            <p className="text-gray-300 mt-2">{bounty.description}</p>
                            <p className="text-green-400 font-bold mt-2">Reward: {bounty.reward || "Still Planning"}</p>
                            <p className="text-gray-500 text-xs mt-2">Created: {new Date(bounty.createdAt).toLocaleDateString()}</p>
                            <div className="mt-4 flex justify-between">
                                <button 
                                 onClick={() => {
                                    setSelectedBounty(bounty);
                                    setShowModal(true);
                                }}
                                className="btn btn-sm btn-primary">Not Interested</button>
                                <button className="btn btn-sm btn-primary">Interested</button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center text-gray-400 col-span-full">
                        No bounties available.
                    </div>
                )}
            </div>
            {showModal && (
                <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={selectedBounty.name}>
                    <BountyDetails bounty={selectedBounty} />
                </Modal>
            )}
        </div>
    );
}
