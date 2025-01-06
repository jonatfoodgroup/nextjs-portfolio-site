"use client";
import Link from "next/link";
import QuestCard from "./QuestCard";
import { Icon } from "@iconify/react/dist/iconify.js";

const BountyCard = ({ bounty }) => {
    if (!bounty) {
        return null;
    }

    // Map status to badge colors or styles
    const statusColors = {
        Open: "bg-green-200 text-green-800",
        closed: "bg-red-200 text-red-800",
        pending: "bg-yellow-200 text-yellow-800",
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col justify-between h-[400px] text-start group hover:-translate-y-2 hover:shadow-xl transition-transform duration-300">
            <div>
                <Link href={`/bounties/${bounty.slug}`}>
                    <Icon
                        icon={bounty.acf?.icon}
                        className="text-6xl text-orange mb-4 bg-light-orange p-2 rounded-md"
                    />
                    <h2 className="text-xl text-start font-bold text-dark-blue mb-2 group-hover:text-orange-500 transition-colors duration-300">
                        {bounty.title.rendered}
                    </h2>
                    <p
                        className="text-sm text-dark-blue mt-0 line-clamp-3 leading-normal"
                        dangerouslySetInnerHTML={{ __html: bounty.excerpt.rendered }}
                    ></p>
                </Link>
            </div>

            {/* Display reward */}
            <div className="flex justify-between items-center mt-4">
                {/* <span className="text-md font-medium text-dark-blue">
                    Reward: <strong>${bounty.acf?.reward || "Not specified"}</strong>
                </span> */}
                <span
                    className={`text-xs font-semibold py-1 px-3 rounded-full ${
                        statusColors[bounty.acf?.status] || "bg-gray-200 text-gray-800"
                    }`}
                >
                    {bounty.acf?.status || "Unknown"}
                </span>
            </div>
            {/* Render quests */}
            <div className="mt-4">
                {
                bounty.acf?.quest &&
                bounty.acf?.quest?.map((questId) => (
                    <QuestCard key={questId} questId={questId} />
                ))}
            </div>
        </div>
    );
};

export default BountyCard;