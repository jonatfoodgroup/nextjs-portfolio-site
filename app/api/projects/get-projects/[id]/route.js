import { firestore } from "../../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export async function GET(req, { params }) {
  const { id } = params; // Extract the project ID from the URL

  try {
    if (!id) {
      return Response.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    // Reference to the specific project in Firestore
    const projectRef = doc(firestore, "projects", id);

    // Fetch the project data
    const projectSnapshot = await getDoc(projectRef);

    if (!projectSnapshot.exists()) {
      return Response.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Return the project data
    return Response.json(
      { id: projectSnapshot.id, ...projectSnapshot.data() },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching project:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}