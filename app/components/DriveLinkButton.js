import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

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
    <Link
      href={driveUrl}
      passHref={true}
      className=""
    >
      <Icon icon="simple-icons:googledrive" />
    </Link>
  );
};

export default DriveLinkButton;