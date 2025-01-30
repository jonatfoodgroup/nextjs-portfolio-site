"use client";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const DriveLinkButton = ({ driveFolderId }) => {
  if (!driveFolderId) {
    return (
      <></>
    );
  }

  // Construct the Google Drive folder URL
  const driveFolderUrl = `https://drive.google.com/drive/folders/${driveFolderId}`;
  return (
    <Link
      className="text-gray-600 hover:text-white"
      href={driveFolderUrl}
      passHref={true}
    >
      <Icon icon="mingcute:drive-line" />
    </Link>
  );
};

export default DriveLinkButton;