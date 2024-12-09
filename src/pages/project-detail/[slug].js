// pages/index.js

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ProjectDetail() {
  const pdfRef = useRef(null);
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
  // const downloadpupppeteerPDF = () => {
  //   window.open(`/api/generate-pdf?projectId=${slug}`, "_blank");
  // };
  const downloadPDF = () => {
    const input = pdfRef.current;

    // Ensure all images are loaded
    const images = input.querySelectorAll("img");
    const imagePromises = Array.from(images).map((img) => {
      return new Promise((resolve, reject) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = resolve;
          img.onerror = reject;
        }
      });
    });

    // Wait for all images to be loaded before proceeding
    Promise.all(imagePromises)
      .then(() => {
        html2canvas(input).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4", true);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
          const imgX = (pdfWidth - imgWidth * ratio) / 2;
          const imgY = 30;

          pdf.addImage(
            imgData,
            "PNG",
            imgX,
            imgY,
            imgWidth * ratio,
            imgHeight * ratio
          );
          pdf.save("invoice.pdf");
        });
      })
      .catch((error) => {
        console.error("Error loading images:", error);
      });
  };
  const windowFun = () => {
    window.print();
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
        <div className="project-detail-page" ref={pdfRef}>
          <section className="cover">
            <img
              src="/images/full-logo.svg"
              style={{ height: "auto", width: "auto" }}
              className="logo-svg"
            />
            <p className="small-text">
              Designing for every customer touchpoint,
              <br /> from awareness to advocacy
            </p>
            <img
              src="/images/round-svg.png"
              width={340}
              height={323}
              className="glass-svg"
            />
            <div className="main-text">
              The ui ux
              <br /> <span className="design-agency">DESIGN AGENCY</span> <br />
              <div className="headline">
                <span className="for">for</span>
                <div className="image-div">
                  <img
                    src="/images/thumbnail.png"
                    style={{ height: "auto", width: "auto" }}
                  ></img>{" "}
                </div>
                <b className="leaders">INDUSTRY</b>
              </div>
              LEADERS
            </div>
          </section>
          <section className="intro">
            <img
              src="/images/glass.svg"
              style={{ height: "auto", width: "auto" }}
              className="glass-svg"
            />
            <p>
              Founded in 2015, we’re a<br />{" "}
              <span>digital strategy agency</span> that aims to
              <br /> deliver end-to-end digital solutions,
              <br /> enabling businesses to more effectively
              <br /> delight their users at every turn.
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
            </a>
          </section>
          <section className="numbers">
            <div className="num">
              <p>
                <span>8+</span> years in the business
              </p>
            </div>
            <div className="num num1">
              <img src="/images/profiles.png" width={800} height={96} />
              <p>
                <span>70+</span> team
              </p>
            </div>
            <div className="num num2">
              <p>
                <span>200+</span> Leading projects
              </p>
              <img src="/images/noise-thumbnail.png" width={73} height={73} />
            </div>
            <div className="num num3">
              <img src="/images/ico.png" width={104} height={116} />

              <p>
                ACROSS <span>25+</span> Industries
              </p>
            </div>
            <div className="num num4">
              <p>
                <span>10+</span> AWARDS RECEIVED
              </p>
              <img src="/images/elephant.png" width={136} height={76} />
            </div>
          </section>
          {/* <section className="awards">
            <p>
              Awards &<br /> <span>recognitions</span>
            </p>
            <table>
              <tbody>
                <tr>
                  <td>2023</td>
                  <td width="2%"></td>
                  <td>
                    <img
                      src="/images/awards/elephant.png"
                      width={54}
                      height={54}
                    />
                  </td>
                  <td width="2%"></td>
                  <td>Kyoorius Baby Blue Elephant </td>
                  <td>Best design project</td>
                </tr>
                <tr>
                  <td>2023</td>
                  <td width="2%"></td>
                  <td>
                    <img src="/images/awards/dna.png" width={54} height={54} />
                  </td>
                  <td width="2%"></td>
                  <td>DNA Paris</td>
                  <td>Best design project</td>
                </tr>
                <tr>
                  <td>2022</td>
                  <td width="2%"></td>
                  <td>
                    <img
                      src="/images/awards/elephant.png"
                      width={54}
                      height={54}
                    />
                  </td>
                  <td width="2%"></td>
                  <td>Kyoorius Baby Blue Elephant </td>
                  <td>Best design project</td>
                </tr>
                <tr>
                  <td>2021</td>
                  <td width="2%"></td>
                  <td>
                    <img src="/images/awards/ibda.png" width={54} height={54} />
                  </td>
                  <td width="2%"></td>
                  <td>IBDA</td>
                  <td>Best design studio</td>
                </tr>
                <tr>
                  <td>2020</td>
                  <td width="2%"></td>
                  <td>
                    <img
                      src="/images/awards/silicon.png"
                      width={54}
                      height={54}
                    />
                  </td>
                  <td width="2%"></td>
                  <td>Silicon India</td>
                  <td>UI/UX Design Company of the year</td>
                </tr>
                <tr>
                  <td>2019</td>
                  <td width="2%"></td>
                  <td>
                    <img
                      src="/images/awards/clutch.png"
                      width={54}
                      height={54}
                    />
                  </td>
                  <td width="2%"></td>
                  <td>Clutch</td>
                  <td>4.9 Rated</td>
                </tr>
                <tr>
                  <td>2019</td>
                  <td width="2%"></td>
                  <td>
                    <img src="/images/awards/ibda.png" width={54} height={54} />
                  </td>
                  <td width="2%"></td>
                  <td>IBDA</td>
                  <td>UI/UX Design Company of the year</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className="partners">
            <p>
              Our <span>partners</span>
            </p>
            <div className="grids">
              <div className="grid">
                <img
                  src="/images/partners/re.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/slash.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/coca-cola.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/slash.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/decathlon.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/slash.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/noises.svg"
                  style={{ height: "auto", width: "auto" }}
                />
              </div>
              <div className="grid">
                <img
                  src="/images/partners/livspace.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/slash.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/greencell.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/slash.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/ht.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/slash.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/hero.svg"
                  style={{ height: "auto", width: "auto" }}
                />
              </div>
              <div className="grid">
                <img
                  src="/images/partners/kotak.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/slash.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/airtel.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/slash.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/tvs.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/slash.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/jupiter.svg"
                  style={{ height: "auto", width: "auto" }}
                />
              </div>
              <div className="grid">
                <img
                  src="/images/partners/healthkart.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/slash.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/itc.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/slash.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/swvl.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/slash.svg"
                  style={{ height: "auto", width: "auto" }}
                />
                <img
                  src="/images/partners/rbl.svg"
                  style={{ height: "auto", width: "auto" }}
                />
              </div>
            </div>
          </section>
          <section className="ideation">
            <div className="ideation-head">
              <p>
                WITH YOU <span>from</span>
              </p>
              <p>IDEATION TO LAUNCH</p>
            </div>
            <div className="ideation-group">
              <div className="topic">
                <img src="/images/ideation/research.png" />
                <p>Research & Strategy</p>
              </div>
              <div className="topic">
                <img src="/images/ideation/branding.png" />
                <p>
                  Branding <br />& Packaging
                </p>
              </div>
              <div className="topic">
                <img src="/images/ideation/digital.png" />
                <p>
                  Digital Products
                  <br /> & Websites
                </p>
              </div>
              <div className="topic">
                <img src="/images/ideation/technology.png" />
                <p>
                  Emerging
                  <br /> technologies
                </p>
              </div>
              <div className="topic">
                <img src="/images/ideation/content.png" />
                <p>Content</p>
              </div>
              <div className="topic">
                <img src="/images/ideation/development.png" />
                <p>Development</p>
              </div>
            </div>
          </section>
          <section className="brand-intro">
            <div className="brand-head">
              <p className="brand-name">Bajaj Auto</p>
              <img src="/images/brand/brand-logo.svg" />
            </div>
            <div className="brand-body">
              <div className="left">
                <p>
                  Enhancing the web- experience for Bajaj’s iconic
                  <b>“Chetak”</b>
                  line of scooters.
                </p>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="32"
                    viewBox="0 0 33 32"
                    fill="none"
                  >
                    <path
                      d="M11.1763 14.6667L13.8429 17.3333L19.1763 12"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.1764 25.3333C21.0675 25.3333 25.8431 20.5577 25.8431 14.6667C25.8431 8.77563 21.0675 4 15.1764 4C9.28539 4 4.50977 8.77563 4.50977 14.6667C4.50977 20.5577 9.28539 25.3333 15.1764 25.3333Z"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M28.5097 27.9999L22.7764 22.2666"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Responsive Web Design (mWeb. + Desktop)
                </button>
              </div>
              <div className="right">
                <img src="/images/brand/brand-image.png" />
              </div>
            </div>
          </section>
          <section className="brief">
            <p>
              <span>The</span> Brief
            </p>
            <div className="content">
              <p>Objective:</p>
              <br />
              <p className="desc">
                Redesign the Chetak.com website to create a modern, minimalist
                experience aligned with Chetak’s brand identity. The design will
                highlight the brand’s story, showcase the line’s features, and
                simplify the test-drive booking and early-sales process while
                following brand guidelines to enhance user engagement and drive
                conversions.
              </p>
              <br />
              <p>Key Design Goals:</p>
              <br />
              <ul>
                <li>
                  <span>Brand Consistency:</span> Adhere to Chetak’s visual
                  identity, ensuring cohesive communication of its values,
                  heritage, and innovation.{" "}
                </li>
                <li>
                  <span>User-Centric Experience:</span>
                  Create intuitive navigation that allows seamless exploration,
                  product discovery, and a smooth sales journey.
                </li>
                <li>
                  <span>Storytelling Focus:</span> Use engaging visuals and
                  concise copy to showcase Chetak’s 50+ year heritage.
                </li>
                <li>
                  <span>Product Showcase:</span> Leverage high-quality visuals
                  and interactive elements to effectively present Chetak’s
                  scooters.
                </li>
                <li>
                  <span>Sales Optimisation: </span>
                  Implement clear CTAs and simplify the purchase journey to
                  reduce drop-offs and improve conversions.
                </li>
              </ul>
            </div>
          </section> */}
        </div>
        <div className="download-cta">
          <button onClick={downloadPDF}>DOWNLOAD</button>
        </div>
      </main>
    </div>
  );
}
