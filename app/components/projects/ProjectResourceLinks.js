"use client";
import React, { useState } from "react";
import { useProjects } from "../../providers/ProjectsProvider";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../Button";

const ProjectResourceLinks = ({ projectId, links = [] }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const { addResourceLink, updateResourceLink, removeResourceLink } = useProjects();
  const [showAddLinkForm, setShowAddLinkForm] = useState(false);

  const handleAddLink = async () => {
    if (!newLink.title || !newLink.url) {
      alert("Both title and URL are required.");
      return;
    }

    try {
      const updatedLinks = [...links, newLink];

      // Save the new link to the parent or backend
      await addResourceLink(projectId, newLink);

      setNewLink({ title: "", url: "" });
    } catch (error) {
      console.error("Failed to add link:", error.message);
    }
  };

  const handleUpdateLink = async (index, updatedLink) => {
    try {
      const updatedLinks = links.map((link, i) =>
        i === index ? updatedLink : link
      );

      // Update the link in the backend
      await updateResourceLink(projectId, updatedLink, index);
      setEditingIndex(null); // Exit editing mode
    } catch (error) {
      console.error("Failed to update link:", error.message);
    }
  };

  const handleRemoveLink = async (index) => {
    if (typeof window !== "undefined" && window.confirm("Are you sure you want to remove this link?")) {
    try {
      const updatedLinks = links.filter((_, i) => i !== index);

      // Remove the link from the backend
      await removeResourceLink(projectId, index);
    } catch (error) {
      console.error("Failed to remove link:", error.message);
    }
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-xl mt-4">
      <h3 className="text-lg font-regular text-gray-400">Resource Links</h3>
      {links.length > 0 ? (
        <ul className="list-none space-y-2 flex flex-col mt-4">
          {links.map((link, index) => (
            <li key={index} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-gray-800 cursor-pointer mb-4">
              {editingIndex === index ? (
                <>
                  <input
                    className="border px-2 py-1 rounded w-1/3"
                    type="text"
                    value={link.title}
                    onChange={(e) =>
                      handleUpdateLink(index, { ...link, title: e.target.value })
                    }
                  />
                  <input
                    className="border px-2 py-1 rounded w-1/3"
                    type="url"
                    value={link.url}
                    onChange={(e) =>
                      handleUpdateLink(index, { ...link, url: e.target.value })
                    }
                  />
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleUpdateLink(index, link)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
                    onClick={() => setEditingIndex(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-lg">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.title}
                    </a>
                  </span>
                  <div className="flex space-x-2">
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => setEditingIndex(index)}
                  >
                    <Icon icon="mdi:pencil" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveLink(index)}
                  >
                    <Icon icon="mdi:delete" />
                  </button>
                  </div>
                </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 my-2">No resource links available.</p>
      )}

        {showAddLinkForm ? (
      <div className="mt-4">
        <input
          className="border px-2 py-1 rounded w-1/3 mr-2"
          type="text"
          value={newLink.title}
          onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
          placeholder="Title"
        />
        <input
          className="border px-2 py-1 rounded w-1/3 mr-2"
          type="url"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          placeholder="URL"
        />
        <Button onClick={handleAddLink} icon="mdi:plus" variant="primary">
          Add
        </Button>
        <Button onClick={() => setShowAddLinkForm(false)} icon="mdi:close" variant="outline">
          Cancel
        </Button>
      </div>
        ) : (
        <Button onClick={() => setShowAddLinkForm(true)} icon="mdi:plus">
          Add Link
        </Button>
        )}
    </div>
  );
};

export default ProjectResourceLinks;