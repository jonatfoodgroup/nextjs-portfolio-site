"use client";
import React, { useEffect } from "react";
import { useBounties } from "../../providers/BountyProvider";
import Button from "../Button";
import { useSession } from "next-auth/react";
import PointsCount from "./PointsCount";

const BountyDetails = ({ bounty }) => {
    const { data: session, status } = useSession();

    const { claimBounty } = useBounties();

    useEffect(() => {
        console.log(bounty);
    }, [bounty]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }
    if (status === "unauthenticated") {
        return <p>Sign in to claim this bounty</p>;
    }
    return (
        <div className="p-4 bg-gray-800 rounded-lg shadow-md text-gray-300">
            <h3 className="text-lg font-semibold text-white">{bounty.title || "Bounty"}</h3>
            <p className="mt-2">{bounty.description}</p>

            {
                bounty.claimedBy && (
                    <div className="mt-4 bg-red-600 text-white p-2 rounded-md">
                        <p>This bounty has been claimed by {bounty.claimedBy}</p>
                    </div>
                )
            }

            <div className="mt-4 space-y-2 text-sm">
                <p><span className="font-medium text-white">Start Date:</span> {bounty.startDate}</p>
                <p><span className="font-medium text-white">End Date:</span> {bounty.endDate}</p>
                <p><span className="font-medium text-white">Reward:</span> <PointsCount points={bounty.reward} /></p>
            </div>

            {
                bounty.claimedBy && bounty.claimedBy === session.user.id && (
                    <div className="mt-4 bg-green-600 text-white p-2 rounded-md">
                        <p>You have claimed this bounty</p>
                    </div>
                )
            }
            {
                !bounty.claimedBy && (
                    <Button
                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
                        onClick={() => claimBounty(bounty.id, session.user.id)}
                    >
                        Claim Bounty
                    </Button>
                )
            }

        </div>
    );
}

export default BountyDetails;