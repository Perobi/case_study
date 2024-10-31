"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../UI-components/button/button";
import classes from "./upload-section.module.css";
import { BsTrash3 } from "react-icons/bs";
import UploadInput from "./components/upload-input";
import { useAlertContext } from "@/context/alert-context";
import FormDetails from "./components/form-details";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function UploadSection() {
  const objektInputRef = useRef(null);
  const gebaudeUnterlagenInputRef = useRef(null);
  const [objektFotos, setObjektFotos] = useState([]);
  const [gebaudeUnterlagen, setGebaudeUnterlagen] = useState([]);
  const [isDraggingObjekt, setIsDraggingObjekt] = useState(false);
  const [isDraggingGebaude, setIsDraggingGebaude] = useState(false);
  const [loadingSubmitting, setLoadingSubmitting] = useState(false);
  const [loadingFetchDetails, setLoadingFetchDetails] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [fileErrors, setFileErrors] = useState(false);

  const { SET_ALERT } = useAlertContext();

  const fetchUserDetails = async (email) => {
    try {
      const response = await fetch(
        `/api/fetch-user-details?email=${encodeURIComponent(email)}`
      );
      const data = await response.json();

      if (data.success) {
        setUserDetails(data.userDetails[0]);
      } else {
        return;
      }
    } catch (error) {
      SET_ALERT({
        msg: `Error fetching user details: ${error.message}`,
        type: "danger",
      });
    }
    setLoadingFetchDetails(false);
  };

  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get("email");
    if (email) {
      fetchUserDetails(email);
    } else {
      setLoadingFetchDetails(false);
    }
  }, []);

  const handleUploadClick = (ref) => {
    ref.current.click();
  };

  const handleFileChange = (event, setter, object) => {
    setFileErrors(false);
    const files = Array.from(event.target.files);
    addFiles(files, setter, object);
  };

  const handleDrop = (event, setter, object) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    addFiles(files, setter, object);
  };

  const addFiles = (files, setter, object) => {
    const newImages = [];
    let errors = false;

    // Check existing count of files
    const existingCount = object?.length;

    if (existingCount >= 8) {
      SET_ALERT({
        msg: "Maximal 8 Bilder pro Abschnitt sind erlaubt.",
        type: "danger",
      });
      return;
    }

    // Check each file
    for (const file of files) {
      if (file.size > 15 * 1024 * 1024) {
        // 15MB in bytes
        SET_ALERT({
          msg: `Die Datei ${file.name} überschreitet die maximale Größe von 15MB.`,
          type: "danger",
        });
        errors = true;
        continue; // Skip to next file
      }

      if (newImages.length + existingCount >= 8) {
        SET_ALERT({
          msg: "Maximal 8 Bilder pro Abschnitt sind erlaubt.",
          type: "danger",
        });
        break; // Stop adding files if limit is reached
      }

      newImages.push({
        url: URL.createObjectURL(file),
        file: file,
      });
    }

    // Only update the state if there were no errors
    if (!errors) {
      setter((prevImages) => {
        const updatedImages = [...prevImages, ...newImages];
        return updatedImages.slice(0, 8); // Ensure only the first 5 are kept
      });
    } else {
      setFileErrors(true);
    }
  };

  const handleRemoveImage = (index, setter) => {
    setter((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoadingSubmitting(true);

    const formData = new FormData();

    if (objektFotos.length === 0 && gebaudeUnterlagen.length === 0) {
      SET_ALERT({
        msg: "Bitte laden Sie mindestens ein Foto oder Datei hoch.",
        type: "danger",
      });
      setFileErrors(true);
      setLoadingSubmitting(false);
      return;
    }

    objektFotos.forEach((item) => {
      formData.append("objektFotos", item.file);
    });
    gebaudeUnterlagen.forEach((item) => {
      formData.append("gebaudeUnterlagen", item.file);
    });

    if (userDetails) {
      formData.append("userEmail", userDetails.user_email);
      formData.append("userFirstName", userDetails.user_first_name || "");
      formData.append("userLastName", userDetails.user_last_name || "");
      formData.append("userPhone", userDetails.user_phone || "");
      formData.append("userAddress", userDetails.user_address || "");
    }

    try {
      const response = await fetch("/api/submit-files", {
        method: "POST",
        body: formData,
      });

      const data = await response.json(); // Get the JSON data

      // Check if the response was successful
      if (response.ok) {
        // Check the HTTP status
        SET_ALERT({
          msg: "Ihre Dokumente wurden erfolgreich eingereicht!",
          type: "success",
        });
      } else {
        // Handle error message from the API response
        SET_ALERT({
          msg: `Fehler beim Hochladen: ${data.error}`,
          type: "danger",
        });
      }
    } catch (error) {
      SET_ALERT({
        msg: `Serverfehler: ${error.message}`,
        type: "danger",
      });
    } finally {
      setLoadingSubmitting(false);
    }
  };

  return (
    <>
      <form className={classes.pageWrapper} onSubmit={submitHandler}>
        <section className={classes.uploadSection}>
          <FormDetails
            loadingFetchDetails={loadingFetchDetails}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
          <section className={classes.flexRow}>
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
                  fileErrors={fileErrors}
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
                  fileErrors={fileErrors}
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
        </section>

        <Button
          type="submit"
          className={classes.button}
          disabled={loadingSubmitting}
        >
          {loadingSubmitting ? (
            <>
              {" "}
              Dokumente werden hochgeladen{" "}
              <AiOutlineLoading3Quarters className={classes.loadingIcon} />
            </>
          ) : (
            "Dokumente einreichen"
          )}
        </Button>
      </form>
    </>
  );
}
