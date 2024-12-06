// pages/index.js

import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
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
                <th>Client Name</th>
                <th>Email</th>
                <th>Number</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody id="projectTableBody">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.project_name || "---"}</td>
                  <td>{project.client_name || "---"}</td>
                  <td>{project.email || "---"}</td>
                  <td>{project.number || "---"}</td>
                  <td>
                    <Link href={`/project-detail/${project.id}`}>
                      <button>View Page</button>
                    </Link>
                  </td>
                  <td>
                    {" "}
                    <button
                      onClick={() =>
                        alert(`Download initiated for ${project.id}`)
                      }
                    >
                      Download Page
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
