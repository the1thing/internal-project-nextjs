import React from "react";

export default function UploadPdf({ isUploadPopup, closePopup }) {
  return (
    <div className={`upload-popup-wrapper ${isUploadPopup ? "active" : ""}`}>
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
      <form id="projectForm">
        <div class="form-div">
          <label for="project_name">Project Name:</label>
          <div class="form-div-input">
            <input
              type="text"
              id="project_name"
              placeholder="Project Name"
              required=""
              value=""
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
              value=""
            />
            <div class="caption-text">Enter the brand name e.g. TVS</div>
          </div>
        </div>
        <div class="form-div">
          <label for="timeline_duration">Project Timeline:</label>
          <div>
            <div class="timeline-container">
              <input
                type="number"
                id="timeline_duration"
                placeholder="Enter duration"
                required=""
                min="1"
                value=""
              />
              <div class="custom-dropdown ">
                <div class="selected-option">
                  Weeks
                  <span class="arrow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                    >
                      <rect x="0" fill="none" width="24" height="24"></rect>
                      <g>
                        <path d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div class="caption-text">
              Enter the project timeline in number e.g. 3 weeks/months
            </div>
          </div>
        </div>

        <button type="submit" class="submit-btn">
          Add Project
        </button>
      </form>
    </div>
  );
}
