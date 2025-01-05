"use client";
import { useWordpress } from "../../providers/WordpressProvider";
import { useEffect } from "react";
import BountyCard from "./BountyCard";

const BountyList = () => {
    const { bounties, fetchBounties } = useWordpress();

    useEffect(() => {
        fetchBounties();
    }, []);

    if (!bounties) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {bounties.map((bounty) => (
                    <div key={bounty.id} data-aos="fade-up">
                        <BountyCard bounty={bounty} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BountyList;