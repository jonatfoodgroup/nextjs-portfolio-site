"use client";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const DriveLinkButton = ({ driveFolderId }) => {
  if (!driveFolderId) {
    return (
      <></>
    );
  }

  // Construct the Google Drive folder URL
  const driveFolderUrl = `https://drive.google.com/drive/folders/${driveFolderId}`;
  return (
    <button
      className="text-gray-600 hover:text-white"
      onClick={() => window.open(driveFolderUrl, "_blank")}
    >
      <Icon icon="mingcute:drive-line" />
    </button>
  );
};

export default DriveLinkButton;