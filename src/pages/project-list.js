// pages/index.js

import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { format } from "date-fns";
import { useRouter } from "next/router";
import UploadPdf from "@/components/UploadPdf";
import DeletePopup from "@/components/DeletePopup";

export default function Home() {
  const router = useRouter();
  const [isUploadPopup, setIsUploadPopup] = useState(false);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [projects, setProjects] = useState([]);
  const [deleteProId, setDeleteProId] = useState("");

  // Fetch projects from Firestore
  const fetchProjects = async () => {
    try {
      const projectRef = collection(db, "projects");

      const snapshot = await getDocs(projectRef);
      const projectList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(projectList);
      setProjects(projectList);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Reference the specific document in the "projects" collection
      const projectDoc = doc(db, "projects", id);
      // Delete the document
      await deleteDoc(projectDoc);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Error deleting project");
    }
  };

  const uploadPopup = () => {
    setIsUploadPopup(true);
  };

  const closePopup = () => {
    setIsUploadPopup(false);
  };

  const closeDeletePopup = () => {
    setIsDeletePopup(false);
  };

  const deleteProject = (id) => {
    setIsDeletePopup(true);
    setDeleteProId(id);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    // Check if the role is not admin
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      router.push("/");
    }
  }, [router]);

  return (
    <div>
      <Head>
        <title>Internal Project</title>
        <meta name="description" content="Onething Internal Projects" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <main>
        <div
          className={`container-homepage ${
            isUploadPopup ? "overflow-hidden" : ""
          }`}
        >
          <div className="container-head">
            <div className="cta-wrapper">
              <a className="bttn bttn-primary" href="/form">
                Add New +
              </a>
            </div>
            <div className="cta-wrapper" onClick={uploadPopup}>
              <a className="bttn bttn-primary">
                Upload <img src="/images/upload.svg" />
              </a>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Brand Name</th>
                <th>Duration</th>
                <th>Date Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="projectTableBody">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.project_name || "---"}</td>
                  <td>{project.brand_name || "---"}</td>
                  <td>
                    {project.timeline_duration || "---"}{" "}
                    {project.timeline_unit || "---"}
                  </td>
                  <td>
                    {project.created_at && project.created_at.seconds
                      ? format(
                          new Date(project.created_at.seconds * 1000),
                          "d MMM, yyyy"
                        )
                      : "---"}
                  </td>

                  <td className="view-td">
                    <Link href={`/project-detail/${project.id}`} target="_blank">
                      View Page{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="76"
                        height="69"
                        viewBox="0 0 76 69"
                        fill="none"
                      >
                        <path
                          d="M43.5516 66.4511C43.6083 66.5145 45.3489 66.9993 47.419 67.528C49.4895 68.0566 51.2059 68.4084 51.2335 68.3102C51.2608 68.2117 51.475 66.6151 51.7093 64.7619C52.1798 61.0405 53.3191 56.6955 54.5365 53.978C58.3312 45.5091 65.1396 39.9015 73.3972 38.444L75.5 38.0728V34.3316V30.5902L73.5941 30.2349C61.1075 27.9073 52.9669 17.5336 51.444 2.0093C51.3447 0.995579 51.2258 0.166439 51.1801 0.166439C50.759 0.166439 43.781 2.03495 43.6491 2.18297C43.5537 2.29 43.6246 3.24033 43.8071 4.29445C45.8263 15.967 51.6078 25.4653 59.1104 29.4367L60.9101 30.3894L23.9017 30.464L0.5 30.5114V38.0829L23.9619 38.1303L60.883 38.2052L58.6109 39.4843C52.7166 42.8023 48.05 49.311 45.3018 58.0474C44.5187 60.5363 43.337 66.2105 43.5516 66.4511Z"
                          fill="#E2E2E2"
                        />
                      </svg>
                    </Link>
                  </td>
                  <td>
                    <div
                      className="delete-wrapper"
                      onClick={() => deleteProject(project.id)}
                    >
                      <img src="/images/delete.svg" alt="delete" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class={`blur-overlay ${isUploadPopup ? "active" : ""}`}></div>
        <UploadPdf
          closePopup={closePopup}
          isUploadPopup={isUploadPopup}
          fetchProjects={fetchProjects}
        />
        <DeletePopup
          handleDelete={handleDelete}
          isDeletePopup={isDeletePopup}
          closeDeletePopup={closeDeletePopup}
          deleteProId={deleteProId}
        />
      </main>
    </div>
  );
}
