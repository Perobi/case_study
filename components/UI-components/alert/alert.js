"use client";
import AlertMsg from "./alert-message";
import { useAlertContext } from "@/context/alert-context";

export default function Alert() {
  const { alert } = useAlertContext();

  return (
    <>
      {alert?.alerts?.length > 0
        ? alert.alerts.map((alert) => <AlertMsg alert={alert} key={alert.id} />)
        : ""}
    </>
  );
}
