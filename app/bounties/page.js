"use client";
import { motion } from "framer-motion";
import { useBounties } from "../providers/BountyProvider";
import Modal from "../components/Modal";
import React from "react";

export default function BountyPage() {
    const [showModal, setShowModal] = React.useState(false);
    const [selectedBounty, setSelectedBounty] = React.useState(null);
    const { bounties } = useBounties();
    return (
        <div className="bg-transparent min-h-screen">
            <div className="container mx-auto py-8">
                <tbody>
                    <tr className="bg-gray-800 text-gray-400">
                        <th className="p-4">Bounty Name</th>
                        <th className="p-4">Start Date</th>
                        <th className="p-4">End Date</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Reward</th>
                        <th className="p-4">Actions</th>
                    </tr>
                    {bounties.length > 0 ? (
                        bounties.map((bounty, index) => (
                            <motion.tr
                                key={bounty.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="border border-gray-700 hover:bg-gray-700 transition"
                            >
                                <td className="p-4">
                                    <button
                                        className="text-left text-blue-500"
                                        onClick={() => {
                                            setSelectedBounty(bounty);
                                            setShowModal(true);
                                        }}
                                    >
                                        {bounty.name}
                                    </button>
                                </td>
                                <td className="p-4">{bounty.startDate}</td>
                                <td className="p-4">{bounty.endDate}</td>
                                <td className="p-4">{bounty.description}</td>
                                <td className="p-4">{bounty.reward}</td>
                                <td className="p-4 space-y-2 flex flex-col">
                                    <button className="btn btn-sm btn-primary">View</button>
                                    <button className="btn btn-sm btn-primary">Edit</button>
                                    <button className="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </motion.tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="p-4 text-center text-gray-400">
                                No bounties available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </div>
            {showModal && (
                <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={selectedBounty.name}>
                    <BountyDetails bounty={selectedBounty} />
                </Modal>
            )}
        </div>
    );
}

const BountyDetails = ({ bounty }) => {
    return (
        <div className="p-4 bg-gray-800">
            <p className="text-gray-400">{bounty.description}</p>
            <p className="text-gray-400">Start Date: {bounty.startDate}</p>
            <p className="text-gray-400">End Date: {bounty.endDate}</p>
            <p className="text-gray-400">Reward: {bounty.reward}</p>
        </div>
    );
}