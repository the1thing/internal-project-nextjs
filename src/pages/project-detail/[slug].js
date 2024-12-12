// pages/index.js

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TimelineChart from "@/components/chart";
import { LoadableContext } from "next/dist/server/route-modules/pages/vendored/contexts/entrypoints";
import Loading from "@/components/Loading";

export default function ProjectDetail({ projectData }) {
  const pdfRef = useRef(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const downloadpupppeteerPDF = () => {
    window.open(`/api/generate-pdf?projectId=${slug}`, "_blank");
  };
  const downloadPDF = () => {
    setLoading(true);
    const input = pdfRef.current; // Reference to the container
    const sections = input.querySelectorAll("section"); // Select all sections

    // Ensure all images are loaded
    const loadImages = (section) => {
      const images = section.querySelectorAll("img");
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
      return Promise.all(imagePromises);
    };

    const processSections = async () => {
      const pdf = new jsPDF("landscape", "pt", [1440, 900]); // PDF in 1440x900 dimensions

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        await loadImages(section); // Ensure all images in this section are loaded

        const canvas = await html2canvas(section, {
          scale: 2, // Improves resolution
          useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 0, 0, 1440, 900);

        // Add a new page if not the last section
        if (i < sections.length - 1) {
          pdf.addPage();
        }
      }

      // Save the PDF
      pdf.save(`${projectData.project_name}.pdf`);
      setLoading(false);
    };

    processSections().catch((error) => {
      console.error("Error generating PDF:", error);
    });
  };

  const windowFun = () => {
    window.print();
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  // useEffect(() => {
  //   fetchProjectById();
  // }, []);
  return (
    <div>
      <Head>
        <title>Project Detail</title>
        <meta name="description" content="Onething Internal Projects" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <main>
        <div className="project-detail-page" id="pdf-content" ref={pdfRef}>
          <section className="cover">
            <a href="/" target="_blank">
              <img
                src="/images/full-logo.svg"
                style={{ height: "auto", width: "auto" }}
                className="logo-svg"
              />
            </a>
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
          <section className="awards">
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
              <p className="brand-name">{projectData?.brand_name}</p>
              <div className="cover">
                {projectData?.brandLogo ? (
                  <img src={projectData?.brandLogo} />
                ) : (
                  <img src="/images/no-img.jpg" />
                )}
              </div>
            </div>
            <div className="brand-body">
              <div className="left">
                <p className="truncate-3">
                  {/* Enhancing the web- experience for Bajaj’s iconic
                  <b>“Chetak”</b>
                  line of scooters. */}
                  {projectData?.project_brief}
                </p>
                <div className="pills">
                  {projectData?.platforms.map((item, index) => (
                    <button key={index}>
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
                      {item.platform}
                    </button>
                  ))}
                </div>
              </div>
              <div className="right">
                <div className="cover">
                  {projectData?.brandImage ? (
                    <img src={projectData?.brandImage} />
                  ) : (
                    <img src="/images/no-img.jpg" />
                  )}
                </div>
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
              <p className="desc truncate-3">
                {projectData?.project_objective}
              </p>
              <br />
              <p>Key Design Goals:</p>
              <br />
              <ul>
                {projectData?.design_goals?.map((item) => (
                  <li>
                    <span>{item.subheading}:</span> {item.description}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          {projectData?.conditionals?.map((item, index) => (
            <section key={index} className="approach briefs-section">
              {/* <p>
                <span>Minimialist</span> Approach
              </p> */}
              <p>
                <span>{item.heading.split(/[\s:,.!?-]/)[0]}</span>{" "}
                {item.heading.includes(" ")
                  ? item.heading.slice(item.heading.indexOf(" ") + 1)
                  : ""}
              </p>
              <div className="content-wrapper">
                <div className="content-card big">
                  <div className="cover">
                    <img src={item.parentImg} alt="approach" />
                  </div>
                  <p>{item.parentCaption}</p>
                </div>
                <div className="content-card small">
                  <div className="cover">
                    <img src={item.childImg} alt="approach" />
                  </div>
                  <p>{item.childCaption}</p>
                </div>
              </div>
              <p className="approach-desc truncate-3">{item.description}</p>
            </section>
          ))}
          {/* <section className="approach briefs-section">
            <p>
              <span>Minimialist</span> Approach
            </p>
            <div className="content-wrapper">
              <div className="content-card big">
                <div className="cover">
                  <img src="/images/approach/a1.png" alt="approach" />
                </div>
                <p>Apple</p>
              </div>
              <div className="content-card small">
                <div className="cover">
                  <img src="/images/approach/a2.png" alt="approach" />
                </div>
                <p>Terra</p>
              </div>
            </div>
            <p className="approach-desc truncate-3">
              The design will adopt a minimalist approach inspired by Apple’s
              website, focusing on a clean layout that highlights Chetak’s
              electric scooters through high-quality visuals and strategic
              content placement.
            </p>
          </section>
          <section className="bold briefs-section">
            <p>
              <span>Bold,</span> Yet simple
            </p>
            <div className="content-wrapper">
              <div className="content-card big">
                <div className="cover">
                  <img src="/images/bold/b1.png" alt="approach" />
                </div>
                <p>OLA</p>
              </div>
              <div className="content-card small">
                <div className="cover">
                  <img src="/images/bold/b2.png" alt="approach" />
                </div>
                <p>Marchtee</p>
              </div>
            </div>
            <p className="approach-desc truncate-3">
              Incorporating Chetak’s brand colors and typography, the interface
              will feature bold typography, simple navigation, and a
              user-friendly layout, ensuring a sleek, modern experience across
              all devices.
            </p>
          </section>
          <section className="micro-interation briefs-section">
            <p>
              <span>Micro-</span> Interactions
            </p>
            <div className="content-wrapper">
              <div className="content-card big">
                <div className="cover">
                  <img src="/images/micro-interaction/m1.png" alt="approach" />
                </div>
                <p>Cowboy</p>
              </div>
              <div className="content-card small">
                <div className="cover">
                  <img src="/images/micro-interaction/m2.png" alt="approach" />
                </div>
                <p>Riese & Miller</p>
              </div>
            </div>
            <p className="approach-desc truncate-3">
              Introduce subtle interactive animations, such as hover effects, to
              enhance user experience without distracting from content, allowing
              for product reveals and detailed exploration.
            </p>
          </section>
          <section className="intuitive-scroll briefs-section">
            <p>
              <span>Intuitive</span> Scroll
            </p>
            <div className="content-wrapper">
              <div className="content-card big">
                <div className="cover">
                  <img src="/images/scroll/s1.png" alt="approach" />
                </div>
                <p>DBrand</p>
              </div>
              <div className="content-card small">
                <div className="cover">
                  <img src="/images/scroll/s2.png" alt="approach" />
                </div>
                <p>Bose</p>
              </div>
            </div>
            <p className="approach-desc truncate-3">
              Implement scroll-triggered animations to dynamically introduce
              content sections, ensuring a responsive and fluid browsing
              experience that aligns with the minimalist aesthetic.
            </p>
          </section> */}
          <section className="unique-pages">
            <h6>
              <span>Unique</span> Pages
            </h6>
            <div className="content">
              <p>For Non-Logged In User:</p>
              <ol>
                {projectData?.uniqueNonLoggedInPages?.map((item, index) => (
                  <li key={index}>{item.description}</li>
                ))}
              </ol>
              <br />
              <p>For Logged In User:</p>
              <ol>
                {projectData?.uniqueLoggedInPages?.map((item, index) => (
                  <li key={index}>{item.description}</li>
                ))}
              </ol>
            </div>
          </section>
          <section className="process">
            <h6>
              <span>Process</span>
            </h6>
            <ol>
              {projectData?.process.map((item, index) => (
                <li key={index}>
                  {item?.subheading}
                  <ol>
                    {item?.description
                      ?.split(".")
                      .filter(Boolean)
                      .slice(0, 2) // Filter out any empty strings
                      .map((detail, index) => (
                        <li key={index}>{detail.trim()}.</li> // Add the full stop back and trim the text
                      ))}
                  </ol>
                </li>
              ))}
            </ol>
          </section>
          <section className="sprint-plan">
            <h6>
              <span>Sprint</span> Plan
            </h6>
            <div className="content truncate-2">
              <p>
                Design Sprints will be discussed with the product and tech teams
                in discovery to prioritise weekly deliverables in sync with
                development plan
              </p>
            </div>
            <TimelineChart
              timeline_unit={projectData?.timeline_unit}
              timeline_duration={projectData?.timeline_duration}
              milestones={projectData?.milestones}
            />
          </section>
          <section className="engagement">
            <h6>
              <span>Engagement </span> Structure
            </h6>
            <div className="content">
              <div className="left">
                <div className="upper bill">
                  <p>Team Structure</p>
                  <table>
                    <tbody>
                      <tr>
                        <th>Members</th>
                        <th>Utilisation</th>
                      </tr>
                      {projectData?.teamStructure.map((item) => (
                        <tr>
                          <td>{item.subheading}</td>
                          <td>{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="lower bill">
                  <p>Commercials</p>
                  <table className="lower-table">
                    <tbody>
                      {projectData?.commercials.map((item, index) => (
                        <tr key={index}>
                          <td>{item.subheading}</td>
                          <td>{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="right">
                <p>Terms</p>
                <ol>
                  {projectData?.termsAndConditions.map((item) => (
                    <li>
                      {item.subheading}
                      <ol>
                        {item?.description
                          ?.split(".")
                          .filter(Boolean) // Filter out any empty strings
                          .slice(0, 2) // Limit the array to the first 2 items
                          .map((detail, index) => (
                            <li key={index}>{detail.trim()}.</li> // Add the full stop back and trim the text
                          ))}
                      </ol>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
          <section className="footer">
            <div className="content">
              <p>Write to us</p>
              <a href="mailto:sayhello@onething.design">
                <p className="mail">sayhello@onething.design</p>
              </a>
              <div className="locations">
                <p>Gurgaon</p>
                <p>Bangalore</p>
                <p>Mumbai</p>
                <p>California</p>
              </div>
            </div>
          </section>
        </div>
        <div className="download-cta">
          {!loading && (
            <button onClick={downloadPDF} className="svg-wrapper">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </button>
          )}
          {loading && <Loading />}
        </div>
      </main>
    </div>
  );
}
export async function getServerSideProps({ params }) {
  const { slug } = params; // Get the slug from URL params

  let projectData = {};

  try {
    const projectRef = collection(db, "projects");
    const snapshot = await getDocs(projectRef);
    const projectList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Find the project with the matching slug
    projectData = projectList.find((item) => item.id === slug) || {};

    // Convert non-serializable fields to serializable format (e.g., Date to string)
    if (projectData.created_at && projectData.created_at.seconds) {
      projectData.created_at = new Date(
        projectData.created_at.seconds * 1000
      ).toISOString();
    }

    // Convert any other non-serializable fields if necessary
    // Example: if there's a field with Map or Set, you would need to convert it to an array or object
  } catch (error) {
    console.error("Error fetching project:", error);
  }

  return {
    props: { projectData }, // Pass project data as a prop to the page
  };
}
