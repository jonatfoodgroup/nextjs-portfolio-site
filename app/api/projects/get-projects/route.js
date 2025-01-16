import { firestore } from "../../../firebase/config";
import { doc, getDocs, collection } from "firebase/firestore";

export async function GET(req, res) {
    try {
        const projectsRef = collection(firestore, "projects");
        const projectsSnapshot = await getDocs(projectsRef);

        const projects = projectsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Loop over projects and get the most recent status update from the statuses array
        for (let project of projects) {
            const statuses = project.statuses;
            if (statuses) {
                const mostRecentStatus = statuses[statuses.length - 1];
                project.status = mostRecentStatus;
            }
        }

        return Response.json(projects, { status: 200 });

    } catch (error) {
        console.error("Error fetching project:", error);
        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}