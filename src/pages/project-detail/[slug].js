// pages/index.js

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
export default function ProjectDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [projectData, setProjectData] = useState({});
  const fetchProjectById = async () => {
    try {
      const projectRef = collection(db, "projects");

      const snapshot = await getDocs(projectRef);
      const projectList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProjectData(projectList.filter((item) => item.id === slug)[0]);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };
  useEffect(() => {
    fetchProjectById();
  }, []);
  return (
    <div>
      <Head>
        <title>Project Detail</title>
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
        <div class="project-detail-page">
          <section className="cover">
            <img src="/images/Cover.png" />
          </section>
          <section className="intro">
            <img src="/images/glass.svg" className="glass-svg" />
            <p>
              Founded in 2015, we’re a <span>digital strategy agency</span> that
              aims to deliver end-to-end digital solutions, enabling businesses
              to more effectively delight their users at every turn.
            </p>
            <p className="small-text">
              In a world full of distractions, it’s time
              <br /> to take back the focus.
            </p>
            <a
              href="https://onething.design"
              target="_blank"
              className="small-text site-visit"
            >
              Visit our site
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="82"
                viewBox="0 0 100 82"
                fill="none"
              >
                <path
                  d="M57.4021 79.5414C57.4778 79.6174 59.7985 80.1991 62.5587 80.8335C65.3193 81.468 67.6078 81.8901 67.6446 81.7723C67.6811 81.6541 67.9667 79.7381 68.279 77.5143C68.9064 73.0486 70.4255 67.8345 72.0487 64.5737C77.1083 54.411 86.1861 47.6818 97.1963 45.9328L100 45.4874V40.998V36.5082L97.4588 36.0819C80.8101 33.2887 69.9559 20.8403 67.9254 2.21116C67.7929 0.994687 67.6344 -0.000277412 67.5735 -0.000277412C67.0119 -0.000277412 57.7081 2.24193 57.5321 2.41955C57.4049 2.54799 57.4995 3.68839 57.7428 4.95333C60.435 18.9604 68.1437 30.3583 78.1472 35.124L80.5468 36.2673L31.2023 36.3568L0 36.4136V45.4995L31.2826 45.5564L80.5107 45.6462L77.4813 47.1812C69.6222 51.1628 63.4 58.9732 59.7358 69.4569C58.6916 72.4435 57.1161 79.2526 57.4021 79.5414Z"
                  fill="#E2E2E2"
                />
              </svg>
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}
