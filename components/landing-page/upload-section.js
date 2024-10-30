"use client";

import { useRef, useState } from "react";
import Button from "../UI-components/button/button";
import classes from "./upload-section.module.css";
import { MdOutlineFileUpload } from "react-icons/md";

export default function UploadSection() {
  const objektInputRef = useRef(null);
  const gebaudeUnterlagenInputRef = useRef(null);
  const [objektFotos, setObjektFotos] = useState([]);
  const [gebaudeUnterlagen, setGebaudeUnterlagen] = useState([]);
  const [isDraggingObjekt, setIsDraggingObjekt] = useState(false);
  const [isDraggingGebaude, setIsDraggingGebaude] = useState(false);

  const handleUploadClick = (ref) => {
    ref.current.click();
  };

  const handleFileChange = (event, setter) => {
    const files = Array.from(event.target.files);
    addFiles(files, setter);
  };

  const handleDrop = (event, setter) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    addFiles(files, setter);
  };

  const addFiles = (files, setter) => {
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file: file,
    }));
    setter((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index, setter) => {
    setter((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <>
      <section className={classes.pageWrapper}>
        <section className={classes.uploadSection}>
          <section className={classes.col}>
            <section className={classes.topSection}>
              <h3 className={classes.sectionTitle}>Objektfotos</h3>
              <p className={classes.description}>
                Ihre Fotos helfen uns, den Zustand der relevanten Gebäudeteile
                präzise zu beurteilen und alle Anforderungen zu prüfen.
              </p>
            </section>

            <section
              className={`${classes.inputSection} ${
                isDraggingObjekt ? classes.dragging : ""
              }`}
              onClick={() => handleUploadClick(objektInputRef)}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingObjekt(true);
              }}
              onDragLeave={() => setIsDraggingObjekt(false)}
              onDrop={(e) => {
                handleDrop(e, setObjektFotos);
                setIsDraggingObjekt(false);
              }}
            >
              <section className={classes.uploadSectionInfo}>
                <MdOutlineFileUpload className={classes.icon} />
                <span className={classes.uploadText}>Hier reinziehen oder</span>
              </section>
              <button className={classes.uploadButton}>Hochladen</button>
              <input
                type="file"
                multiple
                className={classes.input}
                accept="image/*"
                ref={objektInputRef}
                onChange={(event) => handleFileChange(event, setObjektFotos)}
              />
            </section>

            <section className={classes.previewSection}>
              {objektFotos.map((image, index) => (
                <section key={index} className={classes.imagePreview}>
                  <img
                    src={image.url}
                    alt={`preview-1-${index}`}
                    className={classes.previewImage}
                  />
                  <button
                    className={classes.removeButton}
                    onClick={() => handleRemoveImage(index, setObjektFotos)}
                  >
                    Remove
                  </button>
                </section>
              ))}
            </section>
          </section>

          <span className={classes.separator} />

          <section className={classes.col}>
            <section className={classes.topSection}>
              <h3 className={classes.sectionTitle}>Gebäudeunterlagen</h3>
              <p className={classes.description}>
                Ihre Grundrisse, Ansichten, Baubeschreibungen und weitere
                Dokumente sind wichtig, um Ihnen eine bessere Beratung zu
                gewährleisten.
              </p>
            </section>

            <section
              className={`${classes.inputSection} ${
                isDraggingGebaude ? classes.dragging : ""
              }`}
              onClick={() => handleUploadClick(gebaudeUnterlagenInputRef)}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingGebaude(true);
              }}
              onDragLeave={() => setIsDraggingGebaude(false)}
              onDrop={(e) => {
                handleDrop(e, setGebaudeUnterlagen);
                setIsDraggingGebaude(false);
              }}
            >
              <section className={classes.uploadSectionInfo}>
                <MdOutlineFileUpload className={classes.icon} />
                <span className={classes.uploadText}>Hier reinziehen oder</span>
              </section>
              <button className={classes.uploadButton}>Hochladen</button>
              <input
                type="file"
                multiple
                className={classes.input}
                accept="image/*"
                ref={gebaudeUnterlagenInputRef}
                onChange={(event) =>
                  handleFileChange(event, setGebaudeUnterlagen)
                }
              />
            </section>

            <section className={classes.previewSection}>
              {gebaudeUnterlagen.map((image, index) => (
                <section key={index} className={classes.imagePreview}>
                  <img
                    src={image.url}
                    alt={`preview-2-${index}`}
                    className={classes.previewImage}
                  />
                  <button
                    className={classes.removeButton}
                    onClick={() =>
                      handleRemoveImage(index, setGebaudeUnterlagen)
                    }
                  >
                    Remove
                  </button>
                </section>
              ))}
            </section>
          </section>
        </section>

        <Button className={classes.button}>Dokumente einreichen</Button>
      </section>
    </>
  );
}
