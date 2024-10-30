import classes from "./services-provided.module.css";
import Image from "next/image";
import umzug from "@/public/assets/services-icons/umzug.png";
import moebelTransport from "@/public/assets/services-icons/moebelTransport.png";
import kleinanzeigen from "@/public/assets/services-icons/kleinanzeigen.png";
import ikea from "@/public/assets/services-icons/ikea.png";
import transporter from "@/public/assets/services-icons/transporter.png";
import spenden from "@/public/assets/services-icons/spenden.png";
import entsorgung from "@/public/assets/services-icons/entsorgung.png";
import aufloesung from "@/public/assets/services-icons/aufloesung.png";
import flohmarkt from "@/public/assets/services-icons/flohmarkt.png";
import buero from "@/public/assets/services-icons/buero.png";
import event from "@/public/assets/services-icons/event.png";
import kuechengereate from "@/public/assets/services-icons/kuechengereate.png";

export default function ServicesProvided() {
  const services = [
    {
      title: "Umzug",
      img: umzug.src,
      colorScheme: "green",
    },
    {
      title: "Möbeltransport",
      img: moebelTransport.src,
      colorScheme: "purple",
    },
    {
      title: "Kleinanzeigen Lieferung",
      img: kleinanzeigen.src,
      colorScheme: "pink",
    },
    {
      title: "IKEA Möbeltaxi",
      img: ikea.src,
      colorScheme: "yellow",
    },
    {
      title: "Transporter Service",
      img: transporter.src,
      colorScheme: "purple",
    },
    {
      title: "Spendenabhohlung",
      img: spenden.src,
      colorScheme: "blue",
    },
    {
      title: "Sperrmüllabholung",
      img: entsorgung.src,
      colorScheme: "yellow",
    },
    {
      title: "Haushaltsauflösung",
      img: aufloesung.src,
      colorScheme: "pink",
    },
    {
      title: "Flohmarkt Lieferung",
      img: flohmarkt.src,
      colorScheme: "yellow",
    },
    {
      title: "Firmenumzug",
      img: buero.src,
      colorScheme: "pink",
    },
    {
      title: "Event- und Messelogistik",
      img: event.src,
      colorScheme: "green",
    },
    {
      title: "Elektrogeräte Transport",
      img: kuechengereate.src,
      colorScheme: "blue",
    },
  ];

  return (
    <>
      <section className={classes.pageSectionWrapper}>
        <h2 className={classes.subTitleSection}>
          Transporter und Umzugshelfer für jeden Anlass
        </h2>
        <div className={classes.servicesProvided}>
          {services.map((service, index) => (
            <div
              key={index}
              className={`${classes.service} ${classes[service.colorScheme]}`}
            >
              <div
                className={`${classes.imgWrapper} ${
                  classes[`${service.colorScheme}Badge`]
                }`}
              >
                <Image
                  src={service.img}
                  className={classes.imgIcon}
                  alt={service.title}
                  width={50}
                  height={50}
                />
              </div>
              <h3 className={classes.subTitleBadge}>{service.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
