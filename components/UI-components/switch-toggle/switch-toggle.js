import classes from "./switch-toggle.module.css";
import { motion } from "framer-motion";

export default function SwitchToggle({ checked, onChange }) {
  return (
    <>
      <section
        className={`${classes.toggleWrapper} ${
          checked ? classes.activeBorder : ""
        }`}
        onClick={() => onChange()}
      >
        <motion.div
          className={`${classes.toggle} ${checked ? classes.active : ""} `}
          initial={false}
          animate={{ x: checked ? 36 : 0 }} // Adjust '42' based on your layout and desired position
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        />
      </section>
    </>
  );
}
