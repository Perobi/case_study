"use client";

import { useRef, useState } from "react";
import Button from "../UI-components/button/button";
import classes from "./upload-section.module.css";
import { BsTrash3 } from "react-icons/bs";
import UploadInput from "./components/upload-input";
import { useAlertContext } from "@/context/alert-context";

export default function UploadSection() {
  const objektInputRef = useRef(null);
  const gebaudeUnterlagenInputRef = useRef(null);
  const [objektFotos, setObjektFotos] = useState([]);
  const [gebaudeUnterlagen, setGebaudeUnterlagen] = useState([]);
  const [isDraggingObjekt, setIsDraggingObjekt] = useState(false);
  const [isDraggingGebaude, setIsDraggingGebaude] = useState(false);
  const [loadingSubmitting, setLoadingSubmitting] = useState(false);

  const { SET_ALERT } = useAlertContext();

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
    console.log(newImages, "New images");
  };

  const handleRemoveImage = (index, setter) => {
    setter((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoadingSubmitting(true);
    setTimeout(() => {
      setLoadingSubmitting(false);
    }, 8000);
    console.log("submitting");
    SET_ALERT({
      msg: "Ihre Dokumente wurden erfolgreich eingereicht!",
      type: "danger",
    });
  };

  return (
    <>
      <form className={classes.pageWrapper} onSubmit={submitHandler}>
        <section className={classes.uploadSection}>
          <section className={classes.col}>
            <section className={classes.topSection}>
              <h3 className={classes.sectionTitle}>Objektfotos</h3>
              <p className={classes.description}>
                Ihre Fotos helfen uns, den Zustand der relevanten Gebäudeteile
                präzise zu beurteilen und alle Anforderungen zu prüfen.
              </p>
            </section>

            <section className={classes.previewGrid}>
              {objektFotos.map((image, index) => (
                <section
                  key={index}
                  className={
                    index === 0
                      ? classes.firstImageWrapper
                      : classes.imageWrapper
                  }
                >
                  <img
                    src={image.url}
                    alt={`preview-1-${index}`}
                    className={classes.image}
                  />
                  <button
                    className={classes.removeButton}
                    type="button"
                    onClick={() => handleRemoveImage(index, setObjektFotos)}
                  >
                    <BsTrash3 className={classes.removeIcon} />
                  </button>
                </section>
              ))}

              <UploadInput
                setIsDragging={setIsDraggingObjekt}
                handleDrop={handleDrop}
                handleFileChange={handleFileChange}
                handleUploadClick={handleUploadClick}
                isDragging={isDraggingObjekt}
                inputRef={objektInputRef}
                setFiles={setObjektFotos}
                files={objektFotos}
              />
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

            <section className={classes.previewGrid}>
              {gebaudeUnterlagen.map((image, index) => (
                <section
                  key={index}
                  className={
                    index === 0
                      ? classes.firstImageWrapper
                      : classes.imageWrapper
                  }
                >
                  <img
                    src={image.url}
                    alt={`preview-2-${index}`}
                    className={classes.image}
                  />
                  <button
                    className={classes.removeButton}
                    type="button"
                    onClick={() =>
                      handleRemoveImage(index, setGebaudeUnterlagen)
                    }
                  >
                    <BsTrash3 className={classes.removeIcon} />
                  </button>
                </section>
              ))}

              <UploadInput
                setIsDragging={setIsDraggingGebaude}
                handleDrop={handleDrop}
                handleFileChange={handleFileChange}
                handleUploadClick={handleUploadClick}
                isDragging={isDraggingGebaude}
                inputRef={gebaudeUnterlagenInputRef}
                setFiles={setGebaudeUnterlagen}
                files={gebaudeUnterlagen}
              />
            </section>
          </section>
        </section>

        <Button className={classes.button}>
          {loadingSubmitting ? "loading..." : "Dokumente einreichen"}
        </Button>
      </form>
    </>
  );
}
