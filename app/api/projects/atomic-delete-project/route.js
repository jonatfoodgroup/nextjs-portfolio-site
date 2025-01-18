import { firestore } from "../../../../firebase/config";
import { NextResponse } from "next/server";
import { collection, query, where, getDocs, writeBatch } from "firebase/firestore";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "Invalid request. 'projectId' is required." },
        { status: 400 }
      );
    }

    // Create a new batch
    const batch = writeBatch(firestore);

    // Fetch and delete all tasks for the project
    const tasksQuery = query(collection(firestore, "tasks"), where("projectId", "==", projectId));
    const tasksSnapshot = await getDocs(tasksQuery);

    for (const taskDoc of tasksSnapshot.docs) {
      const taskId = taskDoc.id;

      // Fetch and delete all steps associated with this task
      const stepsQuery = query(collection(firestore, "steps"), where("taskId", "==", taskId));
      const stepsSnapshot = await getDocs(stepsQuery);

      stepsSnapshot.forEach((stepDoc) => {
        batch.delete(stepDoc.ref);
      });

      // Delete the task itself
      batch.delete(taskDoc.ref);
    }

    // Delete the project itself
    const projectRef = collection(firestore, "projects").doc(projectId);
    batch.delete(projectRef);

    // Commit the batch
    await batch.commit();

    return NextResponse.json(
      { success: true, message: `Project with ID ${projectId} and its related data have been deleted.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "An error occurred during deletion", details: error.message },
      { status: 500 }
    );
  }
}