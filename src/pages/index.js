// pages/index.js

import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { format } from "date-fns";

export default function Home() {
  const [projects, setProjects] = useState([]);

  // Fetch projects from Firestore
  const fetchProjects = async () => {
    try {
      const projectRef = collection(db, "projects");

      const snapshot = await getDocs(projectRef);
      const projectList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectList);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <div>
      <Head>
        <title>Internal Project</title>
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
          <div className="container-head">
            <div className="cta-wrapper">
              <a className="bttn bttn-primary" href="/form">
                Add New +
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

                  <td>
                    <Link href={`/project-detail/${project.id}`}>
                      <button>View Page</button>
                    </Link>
                  </td>
                  {/* <td>
                    {" "}
                    <button
                      onClick={() =>
                        alert(`Download initiated for ${project.id}`)
                      }
                    >
                      Download Page
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
