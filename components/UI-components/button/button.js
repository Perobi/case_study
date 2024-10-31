"use client";
import classes from "./button.module.css";
import { useRouter } from "next/navigation";

export default function Button({ children, location, className }) {
  const router = useRouter();

  const navigateHandler = (e) => {
    e.preventDefault();
    router.push(location);
  };

  return (
    <button
      className={`${classes.buttonStyles} ${className}`}
      onClick={(e) => navigateHandler(e)}
    >
      {children}
    </button>
  );
}
