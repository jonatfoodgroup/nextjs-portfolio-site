"use client";
import React, { useMemo, useState } from "react";
import { useContent, ContentProvider } from "../../../providers/ContentProvider";
import AddContentForm from "../../../components/content/AddContentForm";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button"; 3
import ContentKanban from "../../../components/content/ContentKanban";
import AgendaView from "../../../components/Agenda";
import Breadcrumb from "../../../components/projects/Breadcrumb";

export default function Page({ params }) {
  const resolvedParams = React.use(params);
  const [tabs, setTabs] = useState([
    {
      id: "create",
      label: "Create",
    },
    {
      id: "schedule",
      label: "Schedule",
    }
  ])
  const [activeTab, setActiveTab] = useState("create");

  if (!resolvedParams.hubspotId) {
    return <p className="mt-20">No company ID provided.</p>;
  }
  return (
    <>
      <div>
        {
          resolvedParams.hubspotId ? (
            <ContentProvider hubspotId={resolvedParams.hubspotId}>
              <Breadcrumb hubspotId={resolvedParams.hubspotId} />
            <div className="flex space-x-4 mb-4">
              {
                tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-1 ${activeTab === tab.id ? "bg-orange-500 text-white px-2" : "text-gray-500 px-2"}`}
                  >
                    {tab.label}
                  </button>
                ))
              }
            </div>

              {
                activeTab === "create" ? (
                  <PipelinePage />
                ) : (
                  <AgendaView />
                )
              }
            </ContentProvider>
          ) : (
            <p>Loading company details...</p>
          )
        }
      </div>
    </>
  );
}

const PipelinePage = () => {
  const { content, updateContent } = useContent();
  const [showModal, setShowModal] = React.useState(false);

  // Transform content into columns for the Kanban board
  const columns = useMemo(() => {
    const groupedContent = content.reduce((acc, item) => {
      if (!acc[item.stage]) {
        acc[item.stage] = {
          title: item.stage.charAt(0).toUpperCase() + item.stage.slice(1), // Capitalize
          items: [],
        };
      }
      acc[item.stage].items.push({
        id: item.id,
        name: item.title,
        ...item,
      });
      return acc;
    }, {});

    return {
      idea: groupedContent.idea || { title: "Idea", items: [] },
      shortlist: groupedContent.shortlist || { title: "Shortlist", items: [] },
      draft: groupedContent.draft || { title: "Draft", items: [] },
      review: groupedContent.review || { title: "Review", items: [] },
      publish: groupedContent.published || { title: "Published", items: [] },
    };
  }, [content]);

  const handleDragEnd = (itemId, sourceColumnId, targetColumnId) => {
    const updatedItem = content.find((item) => item.id === itemId);
    if (!updatedItem || updatedItem.stage === targetColumnId) return;

    updateContent(itemId, { stage: targetColumnId });
  };

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>New Idea</Button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} isOpen={showModal} title="New Idea">
          <AddContentForm onClose={() => setShowModal(false)} />
        </Modal>
      )}

      <ContentKanban
        columnsData={columns}
        onDragEnd={handleDragEnd}
      />
    </div>
  );
};
