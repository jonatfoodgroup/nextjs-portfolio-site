import React from "react";

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
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
    >
      Open Drive Folder
    </button>
  );
};

export default DriveLinkButton;