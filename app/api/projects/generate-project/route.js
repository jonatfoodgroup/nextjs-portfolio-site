import { firestore } from "../../../firebase/config";
import { NextResponse } from "next/server";
import { collection, doc, writeBatch } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    const { projectDescription, tasks } = body;

    if (!projectDescription || !Array.isArray(tasks)) {
      return NextResponse.json(
        { error: "Invalid request. Ensure 'projectDescription' and 'tasks' are provided." },
        { status: 400 }
      );
    }

    // Create a new batch
    const batch = writeBatch(firestore);

    // Create a new project document and get its reference
    const projectRef = doc(collection(firestore, "projects"));
    batch.set(projectRef, {
      description: projectDescription,
      createdAt: new Date().toISOString(),
    });

    const projectId = projectRef.id;

    // Process tasks
    tasks.forEach((task) => {
      const { name: taskName, subtasks = [] } = task;
      if (!taskName) return;

      // Create task document
      const taskRef = doc(collection(firestore, "tasks"));
      batch.set(taskRef, {
        projectId,
        name: taskName,
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      const taskId = taskRef.id;

      // Process subtasks
      subtasks.forEach((subtask) => {
        const { name: subtaskName, steps = [] } = subtask;
        if (!subtaskName) return;

        // Create subtask document
        const subtaskRef = doc(collection(firestore, "tasks"));
        batch.set(subtaskRef, {
          projectId,
          parentTaskId: taskId,
          name: subtaskName,
          status: "pending",
          createdAt: new Date().toISOString(),
        });

        const subtaskId = subtaskRef.id;

        // Process steps
        steps.forEach((step) => {
          const { name: stepName } = step;
          if (!stepName) return;

          // Create step document
          const stepRef = doc(collection(firestore, "steps"));
          batch.set(stepRef, {
            taskId: subtaskId,
            name: stepName,
            status: "pending",
            createdAt: new Date().toISOString(),
          });
        });
      });
    });

    // Commit the batch
    await batch.commit();

    return NextResponse.json(
      { success: true, projectId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "An error occurred", details: error.message },
      { status: 500 }
    );
  }
}