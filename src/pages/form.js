// pages/index.js

import Head from "next/head";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
export default function Form() {
  const [formData, setFormData] = useState({
    project_name: "",
    project_description: "",
    client_name: "",
    email: "",
    number: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(`Change detected on: id="${id}", value="${value}"`);
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    const isEmptyField = Object.values(formData).some((value) => !value.trim());
    if (isEmptyField) {
      alert("All fields are required. Please fill out the form completely.");
      return;
    }

    try {
      const projectRef = collection(db, "projects");
      console.log(formData, "formdata");
      await addDoc(projectRef, { ...formData, created_at: new Date() });

      alert("Project added successfully!");
      setFormData({
        project_name: "",
        project_description: "",
        client_name: "",
        email: "",
        number: "",
      });
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Error adding project");
    }
  };

  return (
    <div>
      <Head>
        <title>Add Project</title>
        <meta name="description" content="Onething Internal Projects" />
        <link
          rel="shortcut icon"
          href="assets/images/favicon.ico"
          type="image/x-icon"
        />
        <link rel="shortcut icon" href="" type="image/x-icon" />
        <link rel="icon" href="" type="image/x-icon" />
      </Head>

      <main>
        <div className="container-homepage">
          <form id="projectForm" onSubmit={handleSubmit}>
            <div className="form-div">
              <label htmlFor="project_name">Project name:</label>
              <input
                type="text"
                id="project_name"
                value={formData.project_name}
                onChange={handleChange}
                placeholder="Project Name"
                required
              />
            </div>

            <div className="form-div">
              <label htmlFor="project_description">Project Description:</label>
              <textarea
                id="project_description"
                value={formData.project_description}
                onChange={handleChange}
                placeholder="Project Description"
                required
              ></textarea>
            </div>
            <div className="form-div">
              <label htmlFor="client_name">Client name:</label>
              <input
                type="text"
                id="client_name"
                value={formData.client_name}
                onChange={handleChange}
                placeholder="Client Name"
                required
              />
            </div>
            <div className="form-div">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
              />
            </div>
            <div className="form-div">
              <label htmlFor="number">Contact Number:</label>
              <input
                type="text"
                id="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Enter Contact Number"
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              Add Project
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
