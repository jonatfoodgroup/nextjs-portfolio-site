import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const DriveLinkButton = ({ folderId }) => {
  if (!folderId) {
    return (
      <div className="text-sm text-gray-500 italic">
        Google Drive folder not linked.
      </div>
    );
  }

  // Construct the Google Drive URL
  const driveUrl = `https://drive.google.com/drive/u/0/folders/${folderId}`;

  return (
    <button
      onClick={() => window.open(driveUrl, "_blank")}
      className="p-0"
    >
      <Icon icon="simple-icons:googledrive" />
    </button>
  );
};

export default DriveLinkButton;