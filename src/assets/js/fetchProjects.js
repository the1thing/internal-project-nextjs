import { db } from "./firebaseConfig.js"; // relative path
import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"; // Import Firestore methods

//  Fetch and display projects dynamically in the table
async function fetchProjects() {
  //   console.log(projectRef, "frwdfv");
  try {
    const projectRef = collection(db, "projects"); // Firestore collection reference
    console.log(projectRef, "frwdfv");
    const snapshot = await getDocs(projectRef); // Fetch project documents
    const projects = snapshot.docs.map((doc) => ({
      id: doc.id, // Include document ID for further use (e.g., linking)
      ...doc.data(),
    }));

    // Get the table body element
    const tableBody = document.querySelector("#projectTableBody");

    // Clear the existing table rows
    tableBody.innerHTML = "";

    // Generate rows dynamically for each project
    projects.forEach((project) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${project.project_name}</td>
        <td>${project.client_name || "N/A"}</td>
        <td>${project.email || "N/A"}</td>
        <td>${project.number || "N/A"}</td>
        <td class="button-td"><button class="view-btn" data-id="${
          project.id
        }">View Page</button></td>
        <td class="button-td"><button class="download-btn" data-id="${
          project.id
        }">Download Page</button></td>
      `;
      tableBody.appendChild(row);
    });

    // Attach event listeners for buttons
    attachEventListeners();
  } catch (error) {
    console.error("Error fetching projects: ", error);
    alert("Failed to load projects.");
  }
}

// Attach event listeners to dynamically generated buttons
function attachEventListeners() {
  // View Page buttons
  document.querySelectorAll(".view-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const projectId = event.target.getAttribute("data-id");
      // Redirect or fetch details for the respective project
      window.location.href = `project-detail.html?id=${projectId}`;
    });
  });

  // Download Page buttons
  document.querySelectorAll(".download-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const projectId = event.target.getAttribute("data-id");
      // Trigger download logic for the respective project
      alert(`Download initiated for project ID: ${projectId}`);
    });
  });
}

// Call fetchProjects on page load
document.addEventListener("DOMContentLoaded", fetchProjects);
