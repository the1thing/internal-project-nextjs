import React, { useState } from "react";
import Loading from "./Loading";

const PDFFileInput = ({setFormData, setLoading, loading}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const uploadPdfCloudinary = async (e) => {
    try{
      console.log(e);
      const selectedFile = e.target.files[0];
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("file", selectedFile);
      data.append("upload_preset", "onething-projects");
      data.append("cloud_name", "deiw8557k");

      const response = await fetch("https://api.cloudinary.com/v1_1/deiw8557k/image/upload",{
        method : "POST",
        body : data,
      })
      if(!response.ok){
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    }catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  }

  async function uploadPdfHandler(e){
    setLoading(true);
    const data = await uploadPdfCloudinary(e);
    const pdfCloudLink = data.secure_url;
    console.log(pdfCloudLink);
    setLoading(false);

    setFormData((prevData) => ({
      ...prevData,
      pdf_link : pdfCloudLink
    }))
  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const uploadedFile = e.dataTransfer.files[0];
      if (uploadedFile.type === "application/pdf") {
        uploadPdfHandler(e);
        setFileName(uploadedFile);
      } else {
        alert("Please upload a PDF file!");
      }
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      uploadPdfHandler(e);
      setFileName(uploadedFile);
    } else {
      alert("Please upload a PDF file!");
    }
  };

  return (
    <div>
      {
        loading ? (
          <div
            className={`custom-pdf-input ${isDragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Loading uploadPdf={true}/>
          </div>
        ) : 
        (
          <div
            className={`custom-pdf-input ${isDragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="application/pdf"
              className="file-input"
              onChange={handleFileChange}
            />
            <div className="placeholder">
              {fileName ? (
                <div>{fileName.name}</div>
              ) : (
                <div className="drag-pdf-input">
                  <div className="upload-pdf-svg">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="50.000000pt" height="50.000000pt" viewBox="0 0 50.000000 50.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
                        fill="#000000" stroke="none">
                        <path d="M205 417 c-27 -27 -40 -33 -65 -29 -30 4 -70 -19 -70 -40 0 -5 -16
                        -24 -35 -42 -51 -49 -43 -121 16 -152 32 -16 139 -19 139 -4 0 6 -27 10 -60
                        10 -51 0 -65 4 -85 25 -33 32 -32 70 3 105 16 15 36 40 46 55 16 24 22 27 55
                        21 33 -5 39 -2 50 18 23 42 92 59 144 35 29 -13 57 -58 57 -93 0 -17 5 -26 15
                        -26 24 0 65 -46 65 -73 0 -43 -39 -67 -108 -67 -35 0 -62 -4 -62 -10 0 -6 29
                        -10 66 -10 59 0 68 3 95 29 46 46 37 106 -20 136 -20 10 -31 25 -35 49 -4 22
                        -20 46 -42 65 -29 26 -43 31 -85 31 -44 0 -55 -4 -84 -33z"/>
                        <path d="M215 250 c-31 -33 -27 -54 5 -25 20 18 20 18 20 -73 0 -55 4 -92 10
                        -92 6 0 10 37 10 92 0 91 0 91 20 73 32 -29 36 -8 5 25 -16 17 -32 30 -35 30
                        -3 0 -19 -13 -35 -30z"/>
                        </g>
                    </svg>
                  </div>
                  <div>Drag and drop a PDF file here, or click to select one</div>
                </div>
              )}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default PDFFileInput;
