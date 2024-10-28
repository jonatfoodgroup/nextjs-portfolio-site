"use client";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Tooltip } from "react-tooltip";

const AccessControls = () => {
    const handlePrint = () => {
      window.print();
    };
    return (
      <div className="flex flex-col mt-8 fixed bottom-0 left-0 p-4 w-full align-items justify-center z-50">
        <div className="flex gap-4 mx-auto bg-slate-50 p-4 rounded">
          <button
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-200"
            onClick={handlePrint}
            data-tooltip-id="Print"
            data-tooltip-place="top"
            data-tooltip-content={"Print"}
          >
            <Icon icon="ri:printer-line" width="24" height="24" />
            <Tooltip id="Print" place="top" />
          </button>
          {/* Share */}
          <button
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-200"
            data-tooltip-id="Share"
            data-tooltip-place="top"
            data-tooltip-content={"Share Access"}
          >
            <Icon icon="mdi:account-security-outline" width="24" height="24" />
            <Tooltip id="Share" place="top" />
          </button>
  
          {/* Request edit */}
          <button
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-200"
            data-tooltip-id="RequestEdit"
            data-tooltip-place="top"
            data-tooltip-content={"Request Edit"}
          >
            <Icon icon="mdi:account-edit-outline" width="24" height="24" />
            <Tooltip id="RequestEdit" place="top" />
          </button>
  
          {/* Comment */}
          <button
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-200"
            data-tooltip-id="Comment"
            data-tooltip-place="top"
            data-tooltip-content={"Comment"}
          >
            <Icon
              icon="mdi:comment-text-multiple-outline"
              width="24"
              height="24"
            />
            <Tooltip id="Comment" place="top" />
          </button>
  
          {/* Schedule a zoom */}
          <button
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-200"
            data-tooltip-id="Schedule"
            data-tooltip-place="top"
            data-tooltip-content={"Schedule a Zoom"}
          >
            <Icon icon="mdi:calendar-plus" width="24" height="24" />
            <Tooltip id="Schedule" place="top" />
          </button>
        </div>
      </div>
    );
  };

export default AccessControls;