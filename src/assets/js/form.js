import { db } from "./firebaseConfig.js"; // relative path
import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"; // Import Firestore methods

const projectForm = document.getElementById("projectForm");
const projectNameInput = document.getElementById("projectName");
const projectDescriptionInput = document.getElementById("projectDescription");
const emailInput = document.getElementById("email");
const numberInput = document.getElementById("number");
const clientNameInput = document.getElementById("clientName");

const projectList = document.getElementById("projectList");

// Add project to Firestore

projectForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const projectData = {
    project_name: projectNameInput.value,
    project_description: projectDescriptionInput.value,
    email: emailInput.value,
    number: numberInput.value,
    clientname: clientNameInput.value,
    created_at: new Date(),
  };

  // Adding the project to Firestore
  try {
    // Use addDoc to add data to the Firestore collection
    const projectRef = collection(db, "projects");
    await addDoc(projectRef, projectData);
    alert("Project added successfully!");
    projectNameInput.value = "";
    projectDescriptionInput.value = "";
    emailInput.value = "";
    numberInput.value = "";
    clientNameInput.value = "";
    fetchProjects(); // Fetch projects again after adding
  } catch (error) {
    console.error("Error adding project: ", error);
    alert("Error adding project");
  }
});
