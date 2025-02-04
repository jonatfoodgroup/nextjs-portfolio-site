"use client";

import React, { useMemo } from "react";
import { useUsers } from "../../providers/UserProvider";

const AssigneeAvatar = ({ assignee }) => {
    if (!assignee) {
        return (
            null
        );
    }

    return (
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700 text-white">
            {assignee.avatar &&
                <img
                    src={assignee.avatar}
                    alt={assignee.username}
                    className="w-full h-full rounded-full object-cover"
                />
            }

            {/* add username badge */}
            <span className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs font-medium px-1 rounded-bl-lg rounded-tr-lg">
                {assignee.username}
            </span>
        </div>
    );
};

export default AssigneeAvatar;