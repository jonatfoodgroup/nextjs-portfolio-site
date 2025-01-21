"use client";
import React, {useMemo} from "react";
import { useContent, ContentProvider } from "../../../providers/ContentProvider";
import AddContentForm from "../../../components/content/AddContentForm";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import ContentKanban from "../../../components/content/ContentKanban";

export default function Page({ params }) {
    const resolvedParams = React.use(params);

    if (!resolvedParams.hubspotId) {
    return <p className="mt-20">No company ID provided.</p>;
  }
  return (
  <>
    <div>
      {
        resolvedParams.hubspotId ? (
          <ContentProvider hubspotId={resolvedParams.hubspotId}>
            <PipelinePage />
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
            name: item.title, // Normalize field usage
            description: item.description || "",
        });
        return acc;
    }, {});

    return {
        idea: groupedContent.idea || { title: "Idea", items: [] },
        draft: groupedContent.draft || { title: "Draft", items: [] },
        review: groupedContent.review || { title: "Review", items: [] },
        publish: groupedContent.publish || { title: "Publish", items: [] },
    };
}, [content]);

  const handleDragEnd = (itemId, sourceColumnId, targetColumnId) => {
      const updatedItem = content.find((item) => item.id === itemId);
      if (!updatedItem || updatedItem.stage === targetColumnId) return;

      updateContent(itemId, { stage: targetColumnId });
  };

  return (
      <div>
          <h1>Content</h1>
          <Button onClick={() => setShowModal(true)}>Add Content</Button>

          {showModal && (
              <Modal onClose={() => setShowModal(false)} isOpen={showModal} title="Add Content">
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
