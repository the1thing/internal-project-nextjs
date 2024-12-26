import React from "react";
import { useState } from "react";
import Loading from "./Loading";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import DragAndDrop from "./DragAndDrop";

export default function UploadPdf({ isUploadPopup, closePopup,fetchProjects }) {

  const [formData, setFormData] = useState({
    project_name: "",
    brand_name: "",
    timeline_unit: "Weeks",
    pdf_link : "",
    isPdf : true
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const projectRef = collection(db, "projects");
      await addDoc(projectRef, { ...formData, created_at: new Date() });
      console.log(formData);
      setFormData({
        project_name: "",
        brand_name: "",
        timeline_unit: "Weeks",
        pdf_link : "",
        isPdf : true
      })
      closePopup()
      fetchProjects()
    }catch(error){
      console.error("Error adding project:", error);
      alert("Error adding project");
    }
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);



  // Function to handle dropdown item selection
  const handleUnitChange = (unit) => {
    handleChange({
      target: { id: "timeline_unit", value: unit },
    });
    setDropdownOpen(false); // Close the dropdown
  };



  return (
    <div className={`upload-popup-wrapper popup-form ${isUploadPopup ? "active" : ""}`}>
      <div className="close-cta" onClick={closePopup}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g id="Menu / Close_MD">
              {" "}
              <path
                id="Vector"
                d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>{" "}
          </g>
        </svg>
      </div>
      <form id="projectForm" className="pdf-form" onSubmit={handleSubmit}>
        <div class="form-div">
          <label for="project_name">Project Name:</label>
          <div class="form-div-input">
            <input
              type="text"
              id="project_name"
              placeholder="Project Name"
              value={formData.project_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div class="form-div">
          <label for="brand_name">Brand Name:</label>
          <div class="form-div-input">
            <input
              type="text"
              id="brand_name"
              placeholder="Brand Name"
              required=""
              value={formData.brand_name}
              onChange={handleChange}
            />
            <div class="caption-text">Enter the brand name e.g. TVS</div>
          </div>
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
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="selected-option">
                {formData.timeline_unit || "Weeks"}
                <span className="arrow">▼</span>
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

        

        <div className="form-div">
          <label>Upload PDF:</label>
          <DragAndDrop setFormData={setFormData} setLoading={setLoading} loading={loading}/>
        </div>

        <div className="btn-submit">
          {
            loading ? (
              <div className="submit-btn">
                <div className="loading-comp">
                  <Loading/>
                </div>
              </div>
            ) : (
                <div>
                  <button type="submit" className="submit-btn">
                    Add Project
                  </button>
                </div>
            )
          }
        </div>
      </form>
    </div>
  );
}
