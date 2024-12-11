// pages/index.js
import Head from "next/head";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Form() {
  const [formData, setFormData] = useState({
    brand_name: "",
    project_name: "",
    project_brief: "",
    project_objective: "",
    design_goals: [],
    client_name: "",
    email: "",
    number: "",
    timeline_duration: "",
    timeline_unit: "weeks",
    platforms: [],
    process: [],
    termsAndConditions: [],
    commercials: [],
    teamStructure: [],
    image: null,
  });

  const [designGoals, setDesignGoals] = useState([
    { subheading: "", description: "" },
  ]);

  const [process, setProcess] = useState([{ subheading: "", description: "" }]);
  const [termsAndConditions, setTermsAndConditions] = useState([
    { subheading: "", description: "" },
  ]);
  const [commercials, setCommercials] = useState([
    { subheading: "", description: "" },
  ]);
  const [teamStructure, setTeamStructure] = useState([
    { subheading: "", description: "" },
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleUnitChange = (unit) => {
    handleChange({
      target: { id: "timeline_unit", value: unit },
    });
    setDropdownOpen(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDesignGoalChange = (index, field, value) => {
    const updatedGoals = designGoals.map((goal, i) =>
      i === index ? { ...goal, [field]: value } : goal
    );
    setDesignGoals(updatedGoals);
    setFormData((prevData) => ({
      ...prevData,
      design_goals: updatedGoals,
    }));
  };

  const handleProcessChange = (index, field, value) => {
    const updatedProcess = process.map((pro, i) =>
      i === index ? { ...pro, [field]: value } : pro
    );

    setProcess(updatedProcess);
    setFormData((prevData) => ({
      ...prevData,
      process: updatedProcess,
    }));
  };

  const handleTermChange = (index, field, value) => {
    const updatedTerm = termsAndConditions.map((term, i) =>
      i === index ? { ...term, [field]: value } : term
    );

    setTermsAndConditions(updatedTerm);
    setFormData((prevData) => ({
      ...prevData,
      termsAndConditions: updatedTerm,
    }));
  };

  const handleCommercialChange = (index, field, value) => {
    const updatedCommercial = commercials.map((comm, i) =>
      i === index ? { ...comm, [field]: value } : comm
    );

    setCommercials(updatedCommercial);
    setFormData((prevData) => ({
      ...prevData,
      commercials: updatedCommercial,
    }));
  };

  const handleTeamStructureChange = (index, field, value) => {
    const updatedTeamStructure = teamStructure.map((teamStructure, i) =>
      i === index ? { ...teamStructure, [field]: value } : teamStructure
    );

    setTeamStructure(updatedTeamStructure);
    setFormData((prevData) => ({
      ...prevData,
      teamStructure: updatedTeamStructure,
    }));
  };

  const addTeamStructure = () => {
    setTeamStructure([...teamStructure, { subheading: "", description: "" }]);
  };

  const removeTeamStructure = (index) => {
    const updatedTeamStructure = teamStructure.filter((_, i) => i != index);
    setTeamStructure(updatedTeamStructure);
    setFormData((prevData) => ({
      ...prevData,
      teamStructure: updatedTeamStructure,
    }));
  };

  const addCommercial = () => {
    setCommercials([...commercials, { subheading: "", description: "" }]);
  };

  const removeCommercial = (index) => {
    const updatedCommercial = commercials.filter((_, i) => i != index);
    setCommercials(updatedCommercial);
    setFormData((prevData) => ({
      ...prevData,
      commercials: updatedCommercial,
    }));
  };
  const addTerm = () => {
    setTermsAndConditions([
      ...termsAndConditions,
      { subheading: "", description: "" },
    ]);
  };

  const removeTerm = (index) => {
    const updatedTerm = termsAndConditions.filter((_, i) => i != index);
    setTermsAndConditions(updatedTerm);
    setFormData((prevData) => ({
      ...prevData,
      termsAndConditions: updatedTerm,
    }));
  };

  const addProcess = () => {
    setProcess([...process, { subheading: "", description: "" }]);
  };

  const removeProcess = (index) => {
    const updatedProcess = process.filter((_, i) => i !== index);
    setProcess(updatedProcess);
    setFormData((prevData) => ({
      ...prevData,
      process: updatedProcess,
    }));
  };

  const addDesignGoal = () => {
    setDesignGoals([...designGoals, { subheading: "", description: "" }]);
  };

  const removeDesignGoal = (index) => {
    const updatedGoals = designGoals.filter((_, i) => i !== index);
    setDesignGoals(updatedGoals);
    setFormData((prevData) => ({
      ...prevData,
      design_goals: updatedGoals,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmptyField = Object.values(formData).some((value) =>
      Array.isArray(value) ? value.length === 0 : !value.trim()
    );
    if (isEmptyField) {
      alert("All fields are required. Please fill out the form completely.");
      return;
    }

    try {
      // Reference to Firebase Storage
      const storage = getStorage();

      // Array to store uploaded image URLs
      const imageUrls = [];

      // Upload images and get their URLs
      for (const file of formData.images) {
        const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        imageUrls.push(downloadURL);
      }

      // Save form data along with image URLs to Firestore
      const projectRef = collection(db, "projects");
      await addDoc(projectRef, {
        ...formData,
        images: imageUrls, // Add image URLs to Firestore
        created_at: new Date(),
      });

      alert("Project added successfully!");
      console.log(formData);

      // Reset form data
      setFormData({
        brand_name: "",
        project_name: "",
        project_brief: "",
        project_objective: "",
        design_goals: [],
        process: [],
        project_description: "",
        client_name: "",
        email: "",
        number: "",
        timeline_duration: "",
        timeline_unit: "weeks",
        platforms: [],
        process: [],
        termsAndConditions: [],
        commercials: [],
        teamStructure: [],
        images: [], // Reset images
      });
      setDesignGoals([{ subheading: "", description: "" }]);
      setProcess([{ subheading: "", description: "" }]);
      setCommercials([{ subheading: "", description: "" }]);
      setTermsAndConditions([{ subheading: "", description: "" }]);
      setTeamStructure([{ subheading: "", description: "" }]);
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
      </Head>

      <main>
        <div className="container-homepage">
          <form id="projectForm" onSubmit={handleSubmit}>
            {/* Brand Name */}
            <div className="form-div">
              <label htmlFor="brand_name">Brand Name:</label>
              <input
                type="text"
                id="brand_name"
                value={formData.brand_name}
                onChange={handleChange}
                placeholder="Brand Name"
                required
              />
            </div>

            {/* Project Name */}
            <div className="form-div">
              <label htmlFor="project_name">Project Name:</label>
              <input
                type="text"
                id="project_name"
                value={formData.project_name}
                onChange={handleChange}
                placeholder="Project Name"
                required
              />
            </div>

            {/* Project Brief */}
            <div className="form-div">
              <label htmlFor="project_brief">Short Overview:</label>
              <textarea
                id="project_brief"
                value={formData.project_brief}
                onChange={handleChange}
                placeholder="Project Brief"
                required
              ></textarea>
            </div>

            {/* Platforms */}
            <div className="form-div">
              <label>Platforms:</label>

              <div className="platform-selection">
                <div className="form-group">
                  <input
                    checked={formData.platforms?.includes("Mobile") || false}
                    onChange={(e) => {
                      const platform = "Mobile";
                      setFormData((prevData) => {
                        const updatedPlatforms = e.target.checked
                          ? [...(prevData.platforms || []), platform]
                          : prevData.platforms?.filter((p) => p !== platform) ||
                            [];
                        return { ...prevData, platforms: updatedPlatforms };
                      });
                    }}
                    type="checkbox"
                    id="html"
                  />
                  <label for="html">Mobile</label>
                </div>
                <div className="form-group">
                  <input
                    checked={formData.platforms?.includes("Desktop") || false}
                    onChange={(e) => {
                      const platform = "Desktop";
                      setFormData((prevData) => {
                        const updatedPlatforms = e.target.checked
                          ? [...(prevData.platforms || []), platform]
                          : prevData.platforms?.filter((p) => p !== platform) ||
                            [];
                        return { ...prevData, platforms: updatedPlatforms };
                      });
                    }}
                    type="checkbox"
                    id="css"
                  />
                  <label for="css">Desktop</label>
                </div>
              </div>
            </div>

            {/* Project Objective */}
            <div className="form-div">
              <label htmlFor="project_objective">Objective:</label>
              <textarea
                id="project_objective"
                value={formData.project_objective}
                onChange={handleChange}
                placeholder="Project Objective"
                required
              ></textarea>
            </div>

            {/* Design Goals */}
            <div className="brief">
              <label>Key Design Goals:</label>
              <ul className="design_goal_un_list">
                {designGoals.map((goal, index) => (
                  <li key={index} className="design_goal_list">
                    <div className="design_goal_head">
                      <span>Design Goal {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeDesignGoal(index)}
                        className="add_new_button"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Subheading"
                      value={goal.subheading}
                      onChange={(e) =>
                        handleDesignGoalChange(
                          index,
                          "subheading",
                          e.target.value
                        )
                      }
                    />
                    <textarea
                      placeholder="Description"
                      value={goal.description}
                      onChange={(e) =>
                        handleDesignGoalChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                    ></textarea>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={addDesignGoal}
                className="add_new_button"
              >
                Add New
              </button>
            </div>

            {/* Process */}
            <div className="brief">
              <label>Process:</label>
              <ul className="design_goal_un_list">
                {process.map((pro, index) => (
                  <li key={index} className="design_goal_list">
                    <div className="design_goal_head">
                      <span>Process {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeProcess(index)}
                        className="add_new_button"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Subheading"
                      value={pro.subheading}
                      onChange={(e) =>
                        handleProcessChange(index, "subheading", e.target.value)
                      }
                    />
                    <textarea
                      placeholder="Description"
                      value={pro.description}
                      onChange={(e) =>
                        handleProcessChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                    ></textarea>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={addProcess}
                className="add_new_button"
              >
                Add New
              </button>
            </div>

            {/* Terms and Conditions */}
            <div className="brief">
              <label>Terms And Conditions:</label>
              <ul className="design_goal_un_list">
                {termsAndConditions.map((term, index) => (
                  <li key={index} className="design_goal_list">
                    <div className="design_goal_head">
                      <span>Term {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeTerm(index)}
                        className="add_new_button"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Subheading"
                      value={term.subheading}
                      onChange={(e) =>
                        handleTermChange(index, "subheading", e.target.value)
                      }
                    />
                    <textarea
                      placeholder="Description"
                      value={term.description}
                      onChange={(e) =>
                        handleTermChange(index, "description", e.target.value)
                      }
                    ></textarea>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={addTerm}
                className="add_new_button"
              >
                Add New
              </button>
            </div>

            {/* Commercials */}
            <div className="brief">
              <label>Commercials:</label>
              <ul className="design_goal_un_list">
                {commercials.map((comm, index) => (
                  <li key={index} className="design_goal_list">
                    <div className="design_goal_head">
                      <span>Commercial {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeCommercial(index)}
                        className="add_new_button"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Subheading"
                      value={comm.subheading}
                      onChange={(e) =>
                        handleCommercialChange(
                          index,
                          "subheading",
                          e.target.value
                        )
                      }
                    />
                    <textarea
                      placeholder="Description"
                      value={comm.description}
                      onChange={(e) =>
                        handleCommercialChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                    ></textarea>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={addCommercial}
                className="add_new_button"
              >
                Add New
              </button>
            </div>

            {/* Team Structure */}
            <div className="brief">
              <label>Team Structure:</label>
              <ul className="design_goal_un_list">
                {teamStructure.map((teamStr, index) => (
                  <li key={index} className="design_goal_list">
                    <div className="design_goal_head">
                      <span>Team Structure {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeTeamStructure(index)}
                        className="add_new_button"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Subheading"
                      value={teamStr.subheading}
                      onChange={(e) =>
                        handleTeamStructureChange(
                          index,
                          "subheading",
                          e.target.value
                        )
                      }
                    />
                    <textarea
                      placeholder="Description"
                      value={teamStr.description}
                      onChange={(e) =>
                        handleTeamStructureChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                    ></textarea>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={addTeamStructure}
                className="add_new_button"
              >
                Add New
              </button>
            </div>

            {/* Project Timeline */}
            <div className="form-div">
              <label htmlFor="timeline_duration">Project Timeline:</label>
              <div className="timeline-container">
                {/* Number Input */}
                <input
                  type="number"
                  id="timeline_duration"
                  value={formData.timeline_duration || ""}
                  onChange={handleChange}
                  placeholder="Enter duration"
                  required
                  min="1"
                />

                {/* Custom Dropdown */}
                <div
                  className={`custom-dropdown ${dropdownOpen ? "open" : ""}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown visibility
                >
                  <div className="selected-option">
                    {formData.timeline_unit || "weeks"}
                    <span className="arrow">▼</span>
                  </div>
                  {dropdownOpen && (
                    <div className="dropdown-options">
                      <div
                        className="dropdown-option"
                        onClick={() => handleUnitChange("weeks")}
                      >
                        Weeks
                      </div>
                      <div
                        className="dropdown-option"
                        onClick={() => handleUnitChange("months")}
                      >
                        Months
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Client Name */}
            <div className="form-div">
              <label htmlFor="client_name">Client Name:</label>
              <input
                type="text"
                id="client_name"
                value={formData.client_name}
                onChange={handleChange}
                placeholder="Client Name"
                required
              />
            </div>

            {/* Email */}
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

            {/* Contact Number */}
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

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              Add Project
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
