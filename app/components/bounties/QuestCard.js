"use client";
import { useState, useEffect, useRef } from "react";
import { useWordpress } from "../../providers/WordpressProvider";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

const QuestCard = ({ questId, size = 32 }) => {
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
                        className="flex items-center mt-4"
                    >
                        {quest.acf?.icon && (
                            <Icon
                                icon={quest.acf.icon}
                                className="text-6xl text-orange mb-4 bg-light-orange p-2 rounded-md"
                            />
                        )}
                        <h4 className="text-md font-semibold text-black hover:underline ml-2">
                            {quest.title.rendered}
                        </h4>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default QuestCard;