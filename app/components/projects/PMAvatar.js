"use client";

import React, { useMemo } from "react";
import { useUsers } from "../../providers/UserProvider";

const PMAvatar = ({ pmId }) => {
    const { users } = useUsers();

    // Find the user in the UserProvider by ID
    const user = useMemo(() => users.find((user) => user.id === pmId), [users, pmId]);

    if (!user) {
        return (
            null
        );
    }

    const initials = user.name
        ?.split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    return (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white">
            {user.avatar ? (
                <img
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                />
            ) : (
                <span className="text-sm font-bold">{initials}</span>
            )}
        </div>
    );
};

export default PMAvatar;