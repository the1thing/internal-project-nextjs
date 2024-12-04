import { db } from "./firebaseConfig.js"; // relative path
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
// import { doc, getDoc } from "firebase/firestore"; // Import necessary functions

// Get the query parameter (project ID) from the URL
function getProjectIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id"); // Extract the 'id' parameter
}

// Fetch the project details by ID and display them
async function fetchProjectById(projectId) {
  try {
    const projectRef = collection(db, "projects"); // Firestore collection reference
    console.log(projectRef, "frwdfv");
    const snapshot = await getDocs(projectRef); // Fetch project documents
    const projects = snapshot.docs.map((doc) => ({
      id: doc.id, // Include document ID for further use (e.g., linking)
      ...doc.data(),
    }));
    const projectData = projects.filter((item) => item.id === projectId);
    // You can now display the project data on the page or use it as needed
    console.log(projectData[0], "projects");

    displayProjectDetails(projectData[0]);
  } catch (error) {
    console.error("Error fetching project: ", error);
    alert("Failed to fetch project details.");
  }
}

// Display the project details on the page
function displayProjectDetails(project) {
  const projectDetails = document.getElementById("projectDetails");
  projectDetails.innerHTML = `
    <h2>${project.project_name}</h2>
    <p><strong>Client Name:</strong> ${project.client_name || "N/A"}</p>
    <p><strong>Email:</strong> ${project.email || "N/A"}</p>
    <p><strong>Number:</strong> ${project.number || "N/A"}</p>
    <p><strong>Description:</strong> ${project.project_description || "N/A"}</p>
  `;
}

// On page load, fetch the project details
document.addEventListener("DOMContentLoaded", () => {
  const projectId = getProjectIdFromUrl();

  if (projectId) {
    fetchProjectById(projectId);
  } else {
    document.getElementById("projectDetails").innerHTML = `
      <p>No project ID provided in the URL.</p>
    `;
  }
});
