"use client";
import React from "react";
import Kanban from "../Kanban";
import Modal from "../Modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import ContentDetails from "./ContentDetails";

const ContentKanban = ({ columnsData, onDragEnd }) => {
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);

    const onItemClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleClose = () => {
        setSelectedItem(null);
        setShowModal(false);
    };

    const renderCardContent = (item) => {
        let iconType;
        // Dynamically determine the icon based on the item type
        switch (item.type) {
            case "email":
                iconType = "mdi:email-outline"; // Email icon
                break;
            case "article":
                iconType = "mdi:note-text-outline"; // Blog post icon
                break;
            case "social":
                iconType = "mdi:share-variant"; // Social post icon
                break;
            default:
                iconType = "mdi:help-circle-outline"; // Default/unknown type icon
        }

        item.title = item.name;

        return (
            <>
            <div className="flex items-center gap-2 mb-2">
                <Icon
                    icon={iconType}
                    className="text-gray-400 flex-shrink-0"
                    width={24}
                    height={24}
                />
                <strong className="text-gray-200 text-sm font-semibold flex-grow">
                    {item.title}
                </strong>
            </div>
            <p className="text-sm text-gray-400 line-clamp-3">{item.description}</p>
        </>
        );
    };

    return (
        <>
            <Kanban
                columnsData={columnsData}
                onDragEnd={onDragEnd}
                onItemClick={onItemClick}
                renderCardContent={renderCardContent}
                columnClassName="bg-gray-800"
                cardClassName="bg-gray-700 border border-gray-600"
            />

            {showModal && (
                <Modal onClose={handleClose} title="Details" isOpen={showModal}>
                    <ContentDetails item={selectedItem} />
                </Modal>
            )}
        </>
    );
};

export default ContentKanban;