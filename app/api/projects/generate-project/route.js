import { firestore } from "../../../firebase/config";
import { NextResponse } from "next/server";
import { collection, doc, getDoc, setDoc, writeBatch } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    const { projectName, projectDescription, hubspotId, tasks } = body;

    if (!projectName || !projectDescription || !hubspotId || !Array.isArray(tasks)) {
      return NextResponse.json(
        { error: "Invalid request. Ensure 'projectName', 'projectDescription', 'hubspotId', and 'tasks' are provided." },
        { status: 400 }
      );
    }

    // Generate the Job Number
    const currentYear = new Date().getFullYear();
    const countersDocRef = doc(firestore, "counters", "projectCount");

    // Get or initialize the counter for the current year
    let currentCount = 0;
    const countersDoc = await getDoc(countersDocRef);

    if (countersDoc.exists()) {
      currentCount = countersDoc.data()[currentYear] || 0;
    } else {
      // If the counters document doesn't exist, initialize it
      await setDoc(countersDocRef, { [currentYear]: 0 });
    }

    // Increment the project count
    const newCount = currentCount + 1;
    const jobNumber = `${currentYear}-${String(newCount).padStart(5, "0")}`; // e.g., "2025-0001"

    // Update the Firestore counter
    await setDoc(
      countersDocRef,
      { [currentYear]: newCount },
      { merge: true } // Ensure we don't overwrite other years
    );

    // Create a Firestore batch
    const batch = writeBatch(firestore);

    // Create the project document
    const projectRef = doc(collection(firestore, "projects"));
    const projectId = projectRef.id; // Firestore auto-generates an ID

    batch.set(projectRef, {
      title: projectName,
      jobNumber,
      description: projectDescription,
      hubspotId: hubspotId,
      createdAt: new Date().toISOString(),
    });

    const subtaskRefs = new Map(); // Store subtask references to link steps properly

    // Process tasks
    tasks.forEach((task) => {
      const { name: taskName, subtasks = [] } = task;
      if (!taskName) return;

      // Create a new task document with an auto-generated ID
      const taskRef = doc(collection(firestore, "tasks"));
      const taskId = taskRef.id;

      batch.set(taskRef, {
        projectId,
        name: taskName,
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      // Process subtasks
      subtasks.forEach((subtask) => {
        const { name: subtaskName, steps = [] } = subtask;
        if (!subtaskName) return;

        // Generate a Firestore document reference for the subtask
        const subtaskRef = doc(collection(firestore, "subtasks"));
        const subtaskId = subtaskRef.id;

        batch.set(subtaskRef, {
          projectId,
          parentTaskId: taskId, // Link this to its parent task
          name: subtaskName,
          status: "pending",
          createdAt: new Date().toISOString(),
        });

        // Store subtask reference
        subtaskRefs.set(subtaskName, subtaskId);

        // Process steps
        steps.forEach((step) => {
          const { name: stepName } = step;
          if (!stepName) return;

          // Generate a Firestore document reference for the step
          const stepRef = doc(collection(firestore, "steps"));
          const stepId = stepRef.id;

          batch.set(stepRef, {
            projectId,
            parentSubtaskId: subtaskId, // Link this step to its parent subtask
            name: stepName,
            status: "pending",
            createdAt: new Date().toISOString(),
          });
        });
      });
    });

    // Commit the batch write to Firestore
    await batch.commit();

    return NextResponse.json(
      { success: true, projectId, jobNumber },
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