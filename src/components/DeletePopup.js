import React from "react";

export default function DeletePopup({ isDeletePopup, closeDeletePopup ,handleDelete, deleteProId}) {
  function deleteProjec(){
    handleDelete(deleteProId);
    closeDeletePopup(true);
  }
  return (
    <div className={`delete-popup-wrapper ${isDeletePopup ? "active" : ""}`}>
      <div className="delete-pop">
        <div>Are you sure you want to delete?</div>
        <button className="delete-project-button" onClick={deleteProjec}>Delete</button>
      </div>
      <div className="close-cta" onClick={closeDeletePopup}>
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
    </div>
  );
}
