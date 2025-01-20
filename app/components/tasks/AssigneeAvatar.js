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
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white">
            {assignee.avatar &&
                <img
                    src={assignee.avatar}
                    alt={assignee.username}
                    className="w-full h-full rounded-full object-cover"
                />
            }
        </div>
    );
};

export default AssigneeAvatar;