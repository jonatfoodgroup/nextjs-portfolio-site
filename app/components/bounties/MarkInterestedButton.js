"use client";
import Button from "../Button";
import { useBounties } from "../../providers/BountyProvider";
import { useSession } from "next-auth/react";
import PointsCount from "./PointsCount";

const MarkInterestedButton = ({ bounty }) => {
    const { data: session, status } = useSession();

    const { markInterested } = useBounties();

    if (status === "loading") {
        return <p>Loading...</p>;
    }
    if (status === "unauthenticated") {
        return <p>Sign in to mark this bounty as interested</p>;
    }
    return (
        <Button
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
            onClick={() => markInterested(bounty.id, session.user.id)}
        >
            Mark Interested
        </Button>
    );
}

export default MarkInterestedButton;