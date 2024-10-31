import { MdOutlineFileUpload } from "react-icons/md";
import classes from "./upload-input.module.css";

export default function UploadInput({
  setIsDragging,
  handleDrop,
  handleFileChange,
  handleUploadClick,
  isDragging,
  inputRef,
  setFiles,
  files,
}) {
  return (
    <>
      <section
        className={`${classes.inputSection} ${
          isDragging ? classes.dragging : ""
        } ${files.length === 0 ? classes.spanAll : classes.span1}`}
        onClick={() => handleUploadClick(inputRef)}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          handleDrop(e, setFiles);
          setIsDragging(false);
        }}
      >
        <section className={classes.uploadSectionInfo}>
          <MdOutlineFileUpload className={classes.icon} />
          {files.length === 0 && (
            <span className={classes.uploadText}>Hier reinziehen oder</span>
          )}
        </section>
        <button type="button" className={classes.uploadButton}>
          Hochladen
        </button>
        <input
          type="file"
          multiple
          className={classes.input}
          accept="image/*"
          ref={inputRef}
          onChange={(event) => handleFileChange(event, setFiles)}
        />
      </section>
    </>
  );
}
