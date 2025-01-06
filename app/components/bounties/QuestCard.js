"use client";
import { useState, useEffect, useRef } from "react";
import { useWordpress } from "../../providers/WordpressProvider";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

const QuestCard = ({ questId, size = 16 }) => {
    const { fetchQuestById } = useWordpress();
    const [quest, setQuest] = useState(null);
    const cacheRef = useRef({}); // Cache to store fetched quests

    useEffect(() => {
        console.log("QuestCard: questId", questId);
        const fetchQuest = async () => {
            if (cacheRef.current[questId]) {
                // Use cached quest if available
                setQuest(cacheRef.current[questId]);
                return;
            }

            const fetchedQuest = await fetchQuestById(questId);

            console.log("QuestCard: fetchedQuest", fetchedQuest);
            if (fetchedQuest) {
                cacheRef.current[questId] = fetchedQuest; // Cache the fetched quest
                setQuest(fetchedQuest);
            }
        };

        fetchQuest();
    }, [questId, fetchQuestById]);

    return (
        <div>
            {quest && (
                <div>
                    <Link
                        href={`/blog/quests/${quest.slug}`}
                        className="flex flex-col items-start space-y-1"
                    >
                        <span className="text-xs font-semibold text-gray-300">
                            Quest
                        </span>
                        <h4 className="text-xs font-semibold text-gray-400 hover:underline transition-colors duration-300 flex items-center">
                            <Icon icon={quest.acf?.icon} className="w-4 h-4 mr-1" />
                            <span>{quest.title.rendered}</span>
                        </h4>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default QuestCard;