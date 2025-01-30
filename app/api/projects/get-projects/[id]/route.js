import { firestore } from "../../../../firebase/config";
import { doc, getDoc, getDocs, query, where, collection } from "firebase/firestore";

export async function GET(req, context) {
  const { id } = context.params; // Extract the project ID from the URL

  if (!id) {
    return new Response(
      JSON.stringify({ error: "Project ID is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    // Reference to the specific project in Firestore
    const projectRef = doc(firestore, "projects", id);
    const projectSnapshot = await getDoc(projectRef);

    if (!projectSnapshot.exists()) {
      return new Response(
        JSON.stringify({ error: "Project not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Query all tasks for this project
    const tasksQuery = query(
      collection(firestore, "tasks"),
      where("projectId", "==", id)
    );
    const tasksSnapshot = await getDocs(tasksQuery);

    // Process tasks and filter subtasks
    const tasks = tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const subTasks = tasks.filter((task) => task.parentTaskId);

    // put subtasks on tasks
    tasks.forEach((task) => {
      if (task.parentTaskId) {
        const parentTask = subTasks.find((subTask) => subTask.id === task.parentTaskId);
        if (parentTask) {
          if (!parentTask.subtasks) {
            parentTask.subtasks = [];
          }
          parentTask.subtasks.push(task);
        }
      }
    });

    // Construct the final project response
    const projectData = {
      id: projectSnapshot.id,
      ...projectSnapshot.data(),
      tasks, // Include all tasks
    };

    return new Response(
      JSON.stringify(projectData),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching project:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}