"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import classes from "./alert-message.module.css";
import { useAlertContext } from "@/context/alert-context";

export default function AlertMsg({ alert }) {
  const { REMOVE_ALERT } = useAlertContext();

  useEffect(() => {
    setTimeout(() => REMOVE_ALERT(alert.id), 7000);
  }, []);

  const closeAlert = () => REMOVE_ALERT(alert.id);

  return (
    <>
      <motion.div
        initial={{ y: "100vh" }}
        animate={{ y: 0 }}
        exit={{ y: "100vh" }}
        transition={{
          duration: 0.6,
        }}
        className={classes.fixed}
      >
        <div
          className={
            alert.type == "danger" ? classes.alertDanger : classes.alert
          }
        >
          <p className={classes.msg}>{alert.msg}</p>

          <AiOutlineCloseCircle className={classes.icon} onClick={closeAlert} />
          {alert && alert.type === "danger" && (
            <div className={classes.progressBar}>
              <div className={classes.progress} />
            </div>
          )}
          {alert && alert.type === "success" && (
            <div className={classes.progressBarSuccess}>
              <div className={classes.progressSuccess} />
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
