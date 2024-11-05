"use client";
import imageCompression from "browser-image-compression";
import { useEffect, useRef, useState } from "react";
import Button from "../UI-components/button/button";
import classes from "./upload-section.module.css";
import { BsTrash3 } from "react-icons/bs";
import UploadInput from "./components/upload-input";
import { useAlertContext } from "@/context/alert-context";
import FormDetails from "./components/form-details";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const [email, setEmail] = useState(null);
  const router = useRouter();

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
      console.error(`Error fetching user details: ${error.message}`);
    }
    setLoadingFetchDetails(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const emailParam = new URLSearchParams(window.location.search).get(
        "email"
      );
      if (emailParam) {
        setEmail(emailParam); // Set the email in state
      } else {
        setLoadingFetchDetails(false);
      }
    }
  }, []); // Empty dependency array means it runs once on mount

  // Fetch user details when `email` changes
  useEffect(() => {
    if (email) {
      fetchUserDetails(email);
    }
  }, [email]);

  const handleUploadClick = (ref) => {
    ref.current.click();
  };

  const handleFileChange = (event, setter, object) => {
    const files = Array.from(event.target.files);
    addFiles(files, setter, object);
  };

  const handleDrop = (event, setter, object) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    addFiles(files, setter, object);
  };

  const addFiles = async (files, setter, object) => {
    const newImages = [];
    setFileErrors(false);

    const existingCount = object?.length;

    if (existingCount >= 8) {
      SET_ALERT({
        msg: "Maximal 8 Bilder pro Abschnitt sind erlaubt.",
        type: "danger",
      });
      return;
    }

    // Compression of images
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    for (const file of files) {
      if (file.size > 15 * 1024 * 1024) {
        SET_ALERT({
          msg: `Die Datei ${file.name} überschreitet die maximale Größe von 15MB.`,
          type: "danger",
        });
        continue;
      }

      if (newImages.length + existingCount >= 8) {
        SET_ALERT({
          msg: "Maximal 8 Bilder pro Abschnitt sind erlaubt.",
          type: "danger",
        });
        break;
      }

      try {
        const compressedFile = await imageCompression(file, options);
        const compressedImage = {
          url: URL.createObjectURL(compressedFile),
          file: compressedFile,
        };
        newImages.push(compressedImage);
      } catch (error) {
        SET_ALERT({
          msg: `Fehler beim Komprimieren von ${file.name}.`,
          type: "danger",
        });
      }
    }

    if (newImages.length > 0) {
      setter((prevImages) => {
        const updatedImages = [...prevImages, ...newImages];
        return updatedImages.slice(0, 8);
      });
    }
  };

  const handleRemoveImage = (index, setter) => {
    setter((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (loadingSubmitting) {
      SET_ALERT({ msg: "Bitte warten...", type: "danger" });
      return;
    }
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
        router.push("/success");
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
                    <Image
                      width={285}
                      height={285}
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
                    <Image
                      width={285}
                      height={285}
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
