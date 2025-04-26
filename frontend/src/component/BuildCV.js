import React from "react";
import { Button } from "@mui/material";

import "./BuildCV.css"; // Import the CSS file

// Importing images for templates
import s from "../assets/img/1.jpg";
import a from "../assets/img/2.jpg";
import b from "../assets/img/3.jpg";
import c from "../assets/img/4.jpg";

const BuildCV = () => {
  const handleExternalLink = (link) => {
    window.open(link, "_blank");
  };

  // Images for the templates
  const templates = [
    { src: s, downloadLink: "https://drive.google.com/uc?id=1JK3SN0L8BPCKvi5hjCl7k0G4kz0XNZR2&export=download" },
    { src: a, downloadLink: "https://drive.google.com/uc?id=1-li7z0WOB2ukUhvmf6Oris_6ap1_oIRj&export=download" },
    { src: b, downloadLink: "https://drive.google.com/uc?id=1mt521IgPyGTQWshtbSGh5FKVaURQdZaK&export=download" },
    { src: c, downloadLink: "https://drive.google.com/uc?id=1-0q8rPp7PckQC3rowWkVCXOlsvuuG-1E&export=download" },
  ];

  return (
    <div className="cv-container">
      <h1 className="cv-title">DOWNLOAD ATS FRIENDLY CV TEMPLATES FOR FRESHERs</h1>
      <p>Hover over the templates to explore and download the best CV templates for freshers.</p>
      
      <div className="template-container">
        {templates.map((template, index) => (
          <div key={index} className="template-item">
            <div className="template-hover">
              <img
                src={template.src}
                alt={`Template ${index + 1}`}
                className="template-image"
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => handleExternalLink(template.downloadLink)}
                className="download-btn"
              >
                Download Template {index + 1}
              </Button>
            </div>
          </div>
        ))}
        
        {/* Fifth item with Watch button */}
        <div className="template-item">
          <div className="template-hover">
            <h3 className="watch-title">Watch How to Make Ultimate ATS FRIENDLY CV</h3>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => handleExternalLink("https://youtu.be/y3R9e2L8I9E?si=wBx8GyhNXK8TnKRh")}
              className="watch-btn"
            >
              Watch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildCV;