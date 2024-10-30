import Link from "next/link";
import classes from "./button.module.css";

export default function Button({ children, onClick, link, className }) {
  return (
    // <Link href={link ? link : ""}>
    <button
      className={`${classes.buttonStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
    // </Link>
  );
}
