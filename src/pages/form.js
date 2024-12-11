// pages/index.js
import Head from "next/head";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import Loading from "@/components/Loading";

export default function Form() {
  const [formData, setFormData] = useState({
    brand_name: "",
    project_name: "",
    project_brief: "",
    project_objective: "",
    design_goals: [],
    timeline_duration: "",
    timeline_unit: "Weeks",
    platforms: [],
    process: [],
    termsAndConditions: [],
    commercials: [],
    teamStructure: [],
    brandLogo: "",
    brandImage: "",
    uniqueLoggedInPages: [],
    uniqueNonLoggedInPages: [],
    milestones: [],
    conditionals: [],
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
  const [uniqueLoggedInPages, setUniqueLoggedInPages] = useState([
    { description: "" },
  ]);
  const [uniqueNonLoggedInPages, setUniqueNonLoggedInPages] = useState([
    { description: "" },
  ]);
  const [milestones, setMilestones] = useState([
    { start: "", end: "", description: "" },
  ]);
  const [conditionals, setConditionals] = useState([
    {
      heading: "",
      parentImg: "",
      childImg: "",
      parentCaption: "",
      childCaption: "",
      description: "",
    },
  ]);
  const [platforms, setPlatforms] = useState([{ platform: "" }]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingParentImg, setLoadingParentImg] = useState(false);
  const [loadingChildImg, setLoadingChildImg] = useState(false);

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

  const handlePlatformChange = (index, field, value) => {
    const updatedPlatform = platforms.map((platform, i) =>
      i === index ? { ...platform, [field]: value } : platform
    );
    setPlatforms(updatedPlatform);
    setFormData((prevData) => ({
      ...prevData,
      platforms: updatedPlatform,
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

  const handleLoggedInPageChange = (index, field, value) => {
    const updatedLoggedInPage = uniqueLoggedInPages.map((loggedInPage, i) =>
      i === index ? { ...loggedInPage, [field]: value } : loggedInPage
    );
    setUniqueLoggedInPages(updatedLoggedInPage);
    setFormData((prevData) => ({
      ...prevData,
      uniqueLoggedInPages: updatedLoggedInPage,
    }));
  };

  const handleNonLoggedInPageChange = (index, field, value) => {
    const updatedNonLoggedInPage = uniqueNonLoggedInPages.map(
      (nonLoggedInPage, i) =>
        i === index ? { ...nonLoggedInPage, [field]: value } : nonLoggedInPage
    );
    setUniqueNonLoggedInPages(updatedNonLoggedInPage);
    setFormData((prevData) => ({
      ...prevData,
      uniqueNonLoggedInPages: updatedNonLoggedInPage,
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

  const handleMilestoneChange = (index, field, value) => {
    const updatedMilestone = milestones.map((milestone, i) =>
      i === index ? { ...milestone, [field]: value } : milestone
    );

    setMilestones(updatedMilestone);
    setFormData((prevData) => ({
      ...prevData,
      milestones: updatedMilestone,
    }));
  };

  const handleConditionalChange = (index, field, value) => {
    const updatedConditional = conditionals.map((conditional, i) =>
      i === index ? { ...conditional, [field]: value } : conditional
    );

    setConditionals(updatedConditional);
    setFormData((prevData) => ({
      ...prevData,
      conditionals: updatedConditional,
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
    if (commercials.length < 3) {
      setCommercials([...commercials, { subheading: "", description: "" }]);
    }
  };

  const addPlatform = () => {
    if (platforms.length < 4) {
      setPlatforms([...platforms, { platform: "" }]);
    }
  };

  const addLoggedInPage = () => {
    setUniqueLoggedInPages([...uniqueLoggedInPages, { description: "" }]);
  };

  const addNonLoggedInPage = () => {
    setUniqueNonLoggedInPages([...uniqueNonLoggedInPages, { description: "" }]);
  };
  const removeNonLoggedInPage = (index) => {
    const updatedNonLoggedInPage = uniqueNonLoggedInPages.filter(
      (_, i) => i != index
    );
    setUniqueNonLoggedInPages(updatedNonLoggedInPage);
    setFormData((prevData) => ({
      ...prevData,
      uniqueNonLoggedInPages: updatedNonLoggedInPage,
    }));
  };

  const removeLoggedInPage = (index) => {
    const updatedLoggedInPage = uniqueLoggedInPages.filter(
      (_, i) => i != index
    );
    setUniqueLoggedInPages(updatedLoggedInPage);
    setFormData((prevData) => ({
      ...prevData,
      uniqueLoggedInPages: updatedLoggedInPage,
    }));
  };

  const removeCommercial = (index) => {
    const updatedCommercial = commercials.filter((_, i) => i != index);
    setCommercials(updatedCommercial);
    setFormData((prevData) => ({
      ...prevData,
      commercials: updatedCommercial,
    }));
  };

  const removePlatform = (index) => {
    const updatedPlatform = platforms.filter((_, i) => i != index);
    setPlatforms(updatedPlatform);
    setFormData((prevData) => ({
      ...prevData,
      platforms: updatedPlatform,
    }));
  };

  const addTerm = () => {
    if (termsAndConditions.length < 5) {
      setTermsAndConditions([
        ...termsAndConditions,
        { subheading: "", description: "" },
      ]);
    }
  };

  const removeTerm = (index) => {
    const updatedTerm = termsAndConditions.filter((_, i) => i != index);
    setTermsAndConditions(updatedTerm);
    setFormData((prevData) => ({
      ...prevData,
      termsAndConditions: updatedTerm,
    }));
  };

  const removeMilestone = (index) => {
    const updatedMilestone = milestones.filter((_, i) => i != index);
    setMilestones(updatedMilestone);
    setFormData((prevData) => ({
      ...prevData,
      milestones: updatedMilestone,
    }));
  };

  const addProcess = () => {
    if (process.length < 4) {
      setProcess([...process, { subheading: "", description: "" }]);
    }
  };

  const addMilestone = () => {
    setMilestones([...milestones, { start: "", end: "", description: "" }]);
  };

  const addConditional = () => {
    setConditionals([
      ...conditionals,
      {
        heading: "",
        parentImg: "",
        childImg: "",
        parentCaption: "",
        childCaption: "",
        description: "",
      },
    ]);
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
    if (designGoals.length < 5) {
      setDesignGoals([...designGoals, { subheading: "", description: "" }]);
    }
  };

  const removeDesignGoal = (index) => {
    const updatedGoals = designGoals.filter((_, i) => i !== index);
    setDesignGoals(updatedGoals);
    setFormData((prevData) => ({
      ...prevData,
      design_goals: updatedGoals,
    }));
  };

  const removeConditional = (index) => {
    const updatedConditional = conditionals.filter((_, i) => i !== index);
    setConditionals(updatedConditional);
    setFormData((prevData) => ({
      ...prevData,
      conditionals: updatedConditional,
    }));
  };

  const uploadImageColudinary = async (e) => {
    try {
      const selectedFile = e.target.files[0];
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("upload_preset", "connectr");
      data.append("cloud_name", "decode");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/decode/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  async function uploadImageHandler(e, type, index) {
    if (type === "logo") {
      setLoadingLogo(true);

      const data = await uploadImageColudinary(e);
      const imageCloudLink = data.secure_url;

      setLoadingLogo(false);
      console.log(data);
      setFormData((prevData) => ({
        ...prevData,
        brandLogo: imageCloudLink,
      }));
    } else if (type === "BrandImage") {
      setLoadingImage(true);

      const data = await uploadImageColudinary(e);
      const imageCloudLink = data.secure_url;

      setLoadingImage(false);
      console.log(data);
      setFormData((prevData) => ({
        ...prevData,
        brandImage: imageCloudLink,
      }));
    } else if (type === "parentImg") {
      setLoadingParentImg(true);

      const data = await uploadImageColudinary(e);
      const imageCloudLink = await data.secure_url;

      setLoadingParentImg(false);
      console.log(data);
      handleConditionalChange(index, "parentImg", imageCloudLink);

      console.log(imageCloudLink);
    } else if (type === "childImg") {
      setLoadingChildImg(true);

      const data = await uploadImageColudinary(e);
      const imageCloudLink = await data.secure_url;
      console.log(imageCloudLink);

      setLoadingChildImg(false);

      handleConditionalChange(index, "childImg", imageCloudLink);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const projectRef = collection(db, "projects");
      await addDoc(projectRef, { ...formData, created_at: new Date() });

      alert("Project added successfully!");
      console.log(formData);

      setFormData({
        brand_name: "",
        project_name: "",
        project_brief: "",
        project_objective: "",
        design_goals: [],
        timeline_duration: "",
        timeline_unit: "Weeks",
        platforms: [],
        process: [],
        termsAndConditions: [],
        commercials: [],
        teamStructure: [],
        brandLogo: "",
        brandImage: "",
        uniqueLoggedInPages: [],
        uniqueNonLoggedInPages: [],
        milestones: [],
        conditionals: [],
      });
      setDesignGoals([{ subheading: "", description: "" }]);
      setProcess([{ subheading: "", description: "" }]);
      setCommercials([{ subheading: "", description: "" }]);
      setTermsAndConditions([{ subheading: "", description: "" }]);
      setTeamStructure([{ subheading: "", description: "" }]);
      setUniqueLoggedInPages([{ description: "" }]);
      setUniqueNonLoggedInPages([{ description: "" }]);
      setMilestones([{ start: "", end: "", description: "" }]);
      setConditionals([
        {
          heading: "",
          parentImg: "",
          childImg: "",
          parentCaption: "",
          childCaption: "",
          description: "",
        },
      ]);
      setPlatforms([{ platform: "" }]);
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
            <div className="brief">
              <label>Platforms:</label>
              <ul className="design_goal_un_list">
                {platforms.map((platform, index) => (
                  <li key={index} className="design_goal_list">
                    <div className="design_goal_head">
                      <span>Platform {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removePlatform(index)}
                        className="add_new_button"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Mobile"
                      value={platform.platform}
                      onChange={(e) =>
                        handlePlatformChange(index, "platform", e.target.value)
                      }
                    />
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={addPlatform}
                className="add_new_button"
              >
                Add New
              </button>
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
                    {formData.timeline_unit || "Weeks"}
                    <span className="arrow">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                      >
                        <rect x="0" fill="none" width="24" height="24" />
                        <g>
                          <path d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586" />
                        </g>
                      </svg>
                    </span>
                  </div>
                  {dropdownOpen && (
                    <div className="dropdown-options">
                      <div
                        className="dropdown-option"
                        onClick={() => handleUnitChange("Weeks")}
                      >
                        Weeks
                      </div>
                      <div
                        className="dropdown-option"
                        onClick={() => handleUnitChange("Months")}
                      >
                        Months
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div className="brief">
              <label>Milestones:</label>
              <ul className="design_goal_un_list">
                {milestones.map((milestone, index) => (
                  <li key={index} className="design_goal_list">
                    <div className="design_goal_head">
                      <span>Milestone {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeMilestone(index)}
                        className="add_new_button"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="milestones-start-end">
                      <input
                        type="number"
                        placeholder="Start"
                        value={milestone.start}
                        onChange={(e) =>
                          handleMilestoneChange(index, "start", e.target.value)
                        }
                      />

                      <input
                        type="number"
                        placeholder="End"
                        value={milestone.end}
                        onChange={(e) =>
                          handleMilestoneChange(index, "end", e.target.value)
                        }
                      />
                    </div>
                    <textarea
                      placeholder="Description"
                      value={milestone.description}
                      onChange={(e) =>
                        handleMilestoneChange(
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
                onClick={addMilestone}
                className="add_new_button"
              >
                Add New
              </button>
            </div>

            {/* Brand Logo */}
            <div>
              {loadingLogo ? (
                <div className="upload-image-cloud">
                  <div className="form-div">
                    <label>Brand Logo:</label>
                    <input type="file" accept="image/*" />
                  </div>
                  <div className="upload-image-load">
                    <Loading />
                  </div>
                </div>
              ) : (
                <div className="upload-image-cloud">
                  <div className="form-div">
                    <label>Brand Logo:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => uploadImageHandler(e, "logo")}
                    />
                  </div>
                  <div className="upload-image-load">
                    {formData.brandLogo === "" ? (
                      <div></div>
                    ) : (
                      <div className="text-image-uploaded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="25"
                          height="25"
                          viewBox="0 0 40 40"
                        >
                          <path
                            fill="#8BB7F0"
                            d="M4.769,37.5c-1.251,0-2.269-1.018-2.269-2.269V4.769C2.5,3.518,3.518,2.5,4.769,2.5h30.462 c1.251,0,2.269,1.018,2.269,2.269v30.462c0,1.251-1.018,2.269-2.269,2.269H4.769z"
                          ></path>
                          <path
                            fill="#4E7AB5"
                            d="M35.231,3C36.206,3,37,3.794,37,4.769v30.462C37,36.206,36.206,37,35.231,37H4.769 C3.794,37,3,36.206,3,35.231V4.769C3,3.794,3.794,3,4.769,3H35.231 M35.231,2H4.769C3.24,2,2,3.24,2,4.769v30.462 C2,36.76,3.24,38,4.769,38h30.462C36.76,38,38,36.76,38,35.231V4.769C38,3.24,36.76,2,35.231,2L35.231,2z"
                          ></path>
                          <path
                            fill="none"
                            stroke="#fff"
                            stroke-miterlimit="10"
                            stroke-width="3"
                            d="M11 20.053L16.964 26.018 30.385 12.598"
                          ></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Brand Image */}
            <div>
              {loadingImage ? (
                <div className="upload-image-cloud">
                  <div className="form-div">
                    <label>Brand Image:</label>
                    <input type="file" accept="image/*" />
                  </div>
                  <div className="upload-image-load">
                    <Loading />
                  </div>
                </div>
              ) : (
                <div className="upload-image-cloud">
                  <div className="form-div">
                    <label>Brand Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => uploadImageHandler(e, "BrandImage")}
                    />
                  </div>
                  <div className="upload-image-load">
                    {formData.brandImage === "" ? (
                      <div></div>
                    ) : (
                      <div className="text-image-uploaded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="25"
                          height="25"
                          viewBox="0 0 40 40"
                        >
                          <path
                            fill="#8BB7F0"
                            d="M4.769,37.5c-1.251,0-2.269-1.018-2.269-2.269V4.769C2.5,3.518,3.518,2.5,4.769,2.5h30.462 c1.251,0,2.269,1.018,2.269,2.269v30.462c0,1.251-1.018,2.269-2.269,2.269H4.769z"
                          ></path>
                          <path
                            fill="#4E7AB5"
                            d="M35.231,3C36.206,3,37,3.794,37,4.769v30.462C37,36.206,36.206,37,35.231,37H4.769 C3.794,37,3,36.206,3,35.231V4.769C3,3.794,3.794,3,4.769,3H35.231 M35.231,2H4.769C3.24,2,2,3.24,2,4.769v30.462 C2,36.76,3.24,38,4.769,38h30.462C36.76,38,38,36.76,38,35.231V4.769C38,3.24,36.76,2,35.231,2L35.231,2z"
                          ></path>
                          <path
                            fill="none"
                            stroke="#fff"
                            stroke-miterlimit="10"
                            stroke-width="3"
                            d="M11 20.053L16.964 26.018 30.385 12.598"
                          ></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Logged In Pages */}
            <div className="brief">
              <label>Logged In User Pages:</label>
              <ul className="design_goal_un_list">
                {uniqueLoggedInPages.map((uniqueLoggedInPage, index) => (
                  <li key={index} className="design_goal_list">
                    <div className="design_goal_head">
                      <span>Page {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeLoggedInPage(index)}
                        className="add_new_button"
                      >
                        Remove
                      </button>
                    </div>
                    <textarea
                      placeholder="Page"
                      value={uniqueLoggedInPage.description}
                      onChange={(e) =>
                        handleLoggedInPageChange(
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
                onClick={addLoggedInPage}
                className="add_new_button"
              >
                Add New
              </button>
            </div>

            {/* Non Logged In Pages */}
            <div className="brief">
              <label>Non Logged In User Pages:</label>
              <ul className="design_goal_un_list">
                {uniqueNonLoggedInPages.map((uniqueNonLoggedInPage, index) => (
                  <li key={index} className="design_goal_list">
                    <div className="design_goal_head">
                      <span>Page {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeNonLoggedInPage(index)}
                        className="add_new_button"
                      >
                        Remove
                      </button>
                    </div>
                    <textarea
                      placeholder="Page"
                      value={uniqueNonLoggedInPage.description}
                      onChange={(e) =>
                        handleNonLoggedInPageChange(
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
                onClick={addNonLoggedInPage}
                className="add_new_button"
              >
                Add New
              </button>
            </div>

            {/* Conditional Section */}
            <div className="brief">
              <label>Conditional Section:</label>
              <ul className="design_goal_un_list">
                {conditionals.map((conditional, index) => (
                  <li key={index} className="design_goal_list">
                    <div className="design_goal_head">
                      <span>Section {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeConditional(index)}
                        className="add_new_button"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="conditional-heading">
                      <label>Heading:</label>
                      <input
                        type="text"
                        placeholder="Heading"
                        value={conditional.heading}
                        onChange={(e) =>
                          handleConditionalChange(
                            index,
                            "heading",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="conditionals">
                      <div className="conditionals-img-wrapper">
                        {loadingParentImg && conditional.parentImg === "" ? (
                          <div className="conditional-img-section">
                            <div className="form-div">
                              <label>Primary Image:</label>
                              <input
                                type="file"
                                accept="image/*"
                                placeholder="Primary Image"
                                onChange={(e) =>
                                  uploadImageHandler(e, "parentImg", index)
                                }
                              />
                            </div>
                            <div className="upload-image-load">
                              <Loading />
                            </div>
                          </div>
                        ) : (
                          <div className="conditional-img-section">
                            <div className="form-div">
                              <label>Primary Image:</label>
                              <input
                                type="file"
                                accept="image/*"
                                placeholder="Primary Image"
                                onChange={(e) =>
                                  uploadImageHandler(e, "parentImg", index)
                                }
                              />
                            </div>
                            <div className="upload-image-load">
                              {conditional.parentImg === "" ? (
                                <div></div>
                              ) : (
                                <div className="text-image-uploaded">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="25"
                                    height="25"
                                    viewBox="0 0 40 40"
                                  >
                                    <path
                                      fill="#8BB7F0"
                                      d="M4.769,37.5c-1.251,0-2.269-1.018-2.269-2.269V4.769C2.5,3.518,3.518,2.5,4.769,2.5h30.462 c1.251,0,2.269,1.018,2.269,2.269v30.462c0,1.251-1.018,2.269-2.269,2.269H4.769z"
                                    ></path>
                                    <path
                                      fill="#4E7AB5"
                                      d="M35.231,3C36.206,3,37,3.794,37,4.769v30.462C37,36.206,36.206,37,35.231,37H4.769 C3.794,37,3,36.206,3,35.231V4.769C3,3.794,3.794,3,4.769,3H35.231 M35.231,2H4.769C3.24,2,2,3.24,2,4.769v30.462 C2,36.76,3.24,38,4.769,38h30.462C36.76,38,38,36.76,38,35.231V4.769C38,3.24,36.76,2,35.231,2L35.231,2z"
                                    ></path>
                                    <path
                                      fill="none"
                                      stroke="#fff"
                                      stroke-miterlimit="10"
                                      stroke-width="3"
                                      d="M11 20.053L16.964 26.018 30.385 12.598"
                                    ></path>
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="conditionals-img-wrapper">
                        {loadingChildImg && conditional.childImg === "" ? (
                          <div className="conditional-img-section">
                            <div className="form-div">
                              <label>Secondary Image:</label>
                              <input
                                type="file"
                                accept="image/*"
                                placeholder="Secondary Image"
                                onChange={(e) =>
                                  uploadImageHandler(e, "childImg", index)
                                }
                              />
                            </div>
                            <div className="upload-image-load">
                              <Loading />
                            </div>
                          </div>
                        ) : (
                          <div className="conditional-img-section">
                            <div className="form-div">
                              <label>Secondary Image:</label>
                              <input
                                type="file"
                                accept="image/*"
                                placeholder="Secondary Image"
                                onChange={(e) =>
                                  uploadImageHandler(e, "childImg", index)
                                }
                              />
                            </div>
                            <div className="upload-image-load">
                              {conditional.childImg === "" ? (
                                <div></div>
                              ) : (
                                <div className="text-image-uploaded">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="25"
                                    height="25"
                                    viewBox="0 0 40 40"
                                  >
                                    <path
                                      fill="#8BB7F0"
                                      d="M4.769,37.5c-1.251,0-2.269-1.018-2.269-2.269V4.769C2.5,3.518,3.518,2.5,4.769,2.5h30.462 c1.251,0,2.269,1.018,2.269,2.269v30.462c0,1.251-1.018,2.269-2.269,2.269H4.769z"
                                    ></path>
                                    <path
                                      fill="#4E7AB5"
                                      d="M35.231,3C36.206,3,37,3.794,37,4.769v30.462C37,36.206,36.206,37,35.231,37H4.769 C3.794,37,3,36.206,3,35.231V4.769C3,3.794,3.794,3,4.769,3H35.231 M35.231,2H4.769C3.24,2,2,3.24,2,4.769v30.462 C2,36.76,3.24,38,4.769,38h30.462C36.76,38,38,36.76,38,35.231V4.769C38,3.24,36.76,2,35.231,2L35.231,2z"
                                    ></path>
                                    <path
                                      fill="none"
                                      stroke="#fff"
                                      stroke-miterlimit="10"
                                      stroke-width="3"
                                      d="M11 20.053L16.964 26.018 30.385 12.598"
                                    ></path>
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="conditionals">
                      <div className="conditional-cap-section">
                        <div className="form-div">
                          <label>Primary Caption:</label>
                          <input
                            type="text"
                            placeholder="Primary Caption"
                            value={conditional.parentCaption}
                            onChange={(e) =>
                              handleConditionalChange(
                                index,
                                "parentCaption",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="conditional-cap-section">
                        <div className="form-div">
                          <label>Secondary Caption:</label>
                          <input
                            type="text"
                            placeholder="Secondary Caption"
                            value={conditional.childCaption}
                            onChange={(e) =>
                              handleConditionalChange(
                                index,
                                "childCaption",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <textarea
                      placeholder="Description"
                      value={conditional.description}
                      onChange={(e) =>
                        handleConditionalChange(
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
                onClick={addConditional}
                className="add_new_button"
              >
                Add New
              </button>
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
