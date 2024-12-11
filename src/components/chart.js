import React from "react";

const TimelineChart = ({ timeline_unit }) => {
  // Milestones data
  let timeline_duration = 5;
  const milestones = [
    { label: "Discovery Research & Stakeholder Interviews", start: 1, end: 2 },
    {
      label: "Information Architecture & Hierarchy, User Journeys & Wireframes",
      start: 2,
      end: 3,
    },
    {
      label:
        "High-Fidelity Visual Design, 3D Animations and Micro Interactions",
      start: 3,
      end: 4,
    },
    { label: "Feedback and Iterations", start: 4, end: 5 },
    { label: "Feedback and Iterations", start: 5, end: 6 },
    { label: "Feedback and Iterations", start: 6, end: 7 },
  ];

  // Generate timeline labels (e.g., M1, M2, ...)
  const timelineLabels = Array.from(
    { length: timeline_duration },
    (_, index) => `${timeline_unit === "months" ? "M" : "W"}${index + 1}`
  );
  console.log(timelineLabels, "lebels");

  return (
    <div className="timeline-chart">
      {/* Render Timeline Labels */}
      <div
        className="label-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <p className="kick-off">Kick off</p>
        {timelineLabels.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>

      <div
        className="milestone-container"
        style={{
          position: "relative",
          overflowX: "auto", // Make the entire timeline scrollable
        }}
      >
        {milestones.map((milestone, index) => {
          const start = milestone.start || 0;
          const end = milestone.end || 0;

          // Calculate start and end percentages
          const startPercentage =
            start > 0 && timeline_duration > 0
              ? ((start - 1) / timeline_duration) * 100
              : 0;
          const endPercentage =
            end > 0 && timeline_duration > 0
              ? (end / timeline_duration) * 100
              : 0;

          // Validate milestone data
          if (startPercentage >= endPercentage) {
            console.warn(
              `Invalid milestone data for "${milestone.label}": Start (${start}) should be less than End (${end})`
            );
          }

          return (
            <div
              key={index}
              style={{
                top: `${index * 150}px`,
                left: `${startPercentage}%`,
              }}
              className="milestones"
            >
              {milestone.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineChart;
