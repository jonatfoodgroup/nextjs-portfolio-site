import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/config";
import { NextResponse } from "next/server";
import {createDiscordChannel} from "../../../utils/discord";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, owner, dueDate, notes, hubspotId, discord_category_id, parent_folder_id } = body;

    console.log("Creating project with title:", title);

    if (!title || !hubspotId || !discord_category_id || !parent_folder_id) {
      return NextResponse.json({ error: "Missing required fields: title or hubspotId" }, { status: 400 });
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


    console.log("Creating project with job number:", jobNumber);
    console.log("The title is:", title);
    // Step 2: Create Google Drive Folder
    const folderResponse = await fetch(`${process.env.BASE_URL}/api/google-drive/create-folder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        folderName: `${jobNumber.slice(-5)} - ${title}`, // Format: "00001 - Project Title"
        parentFolderId: parent_folder_id,
      }),
    });

    if (!folderResponse.ok) {
      throw new Error("Failed to create Google Drive folder");
    }

    const { folderId } = await folderResponse.json();


    // get only the second part of the job number
    const jobNumberArray = jobNumber.split("-");
    const jobNumberPart = jobNumberArray[1];


    // Step 2: Create a Discord channel using the Job ID
    const discordChannelId = await createDiscordChannel(jobNumberPart + "-" + title, discord_category_id);

    // Create the new project with the generated Job Number
    const newProject = {
      title,
      jobNumber,
      hubspotId,
      googleDriveFolderId: folderId,
        discordChannelId,
      owner: owner || "Unassigned", // Default if no owner
      status: "Not Started", // Default status
      progress: 0, // Default progress
      dueDate: dueDate || null,
      notes: notes || "",
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(firestore, "projects"), newProject);

    return NextResponse.json({ id: docRef.id, ...newProject }, { status: 201 });
  } catch (error) {
    console.error("Error adding project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}