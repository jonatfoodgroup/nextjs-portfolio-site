"use client";
import { useState, useEffect } from "react";

const FollowAuthor = ({ authorId, name }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        // Retrieve the follow state array from localStorage
        const storedFollowState = localStorage.getItem("followed_authors");
        if (storedFollowState) {
            const followedAuthors = JSON.parse(storedFollowState);
            setIsFollowing(followedAuthors.includes(authorId));
        }
    }, [authorId]);

    const toggleFollow = () => {
        // Retrieve the current list of followed authors
        const storedFollowState = localStorage.getItem("followed_authors");
        const followedAuthors = storedFollowState ? JSON.parse(storedFollowState) : [];

        let updatedFollowedAuthors;

        if (isFollowing) {
            // Remove authorId from the array if unfollowing
            updatedFollowedAuthors = followedAuthors.filter((id) => id !== authorId);
        } else {
            // Add authorId to the array if following
            updatedFollowedAuthors = [...followedAuthors, authorId];
        }

        // Update the follow state and save to localStorage
        setIsFollowing(!isFollowing);
        localStorage.setItem("followed_authors", JSON.stringify(updatedFollowedAuthors));
    };

    return (
        <div>
            <button
                className={`shiny-button bg-orange ${ isFollowing ? "bg-orange-500" : "bg-orange-300"
                }  px-4 py-2 rounded-md relative overflow-hidden`}
                onClick={toggleFollow}
            >
                <span className="shiny-effect"></span>
                {isFollowing ? "Unfollow" : "Follow"} {name}
            </button>
        </div>
    );
};

export default FollowAuthor;