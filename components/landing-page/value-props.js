import classes from "./value-props.module.css";

import mauritz from "@/public/assets/mauritz.png";

import basementCeiling from "@/public/assets/einspritztypes/basementCeiling.png";
import facade from "@/public/assets/einspritztypes/facade.png";
import roof from "@/public/assets/einspritztypes/roof.png";
import topFloorCeiling from "@/public/assets/einspritztypes/topFloorCeiling.png";

import varmWorker from "@/public/assets/varmWorker.png";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";

export default function ValueProps() {
  const transporterSection = [
    {
      title: "Fassade",
      img: facade.src,
    },
    {
      title: "Obere Geschossdecke",
      img: topFloorCeiling.src,
    },

    {
      title: "Dach",
      img: roof.src,
    },
    {
      title: "Kellerdecke",
      img: basementCeiling.src,
    },
  ];

  const badges = [
    "Energieeinparungen️️ 💡",
    "Schallschutz 💸",
    "Komfort 🛋️",
    "Wertsteigerung 📈",
    "Umweltschutz 🌍",
    "Staatliche Förderung 💰",
  ];

  return (
    <>
      <section className={classes.pageSectionWrapper}>
        <section className={classes.header}>
          <h2 className={classes.title}>Einspritzdämmung Bequem und Einfach</h2>
        </section>
        <ul className={classes.sections}>
          {/* Purple */}

          <li
            className={`${classes.section} ${classes.purple} ${classes.gap}`}
            key={4}
          >
            <div className={`${classes.titleBadge} ${classes.purpleBadge} `}>
              <h3 className={classes.badgeTitle}>
                Persöhnlicher Ansprechspartner
              </h3>
            </div>
            <section className={classes.sectionAnsprechspartner}>
              <section className={classes.topSection}>
                <img
                  src={mauritz.src}
                  alt="mauritz"
                  className={classes.profileImg}
                />
                <section className={classes.details}>
                  <h3 className={classes.badgeTitle}>Mauritz Koch</h3>
                  <h3 className={classes.smallBadge}>Dämmexperte</h3>
                </section>
              </section>
              <section className={classes.contactSection}>
                <section className={classes.contactDetail}>
                  <FiPhone className={classes.icon} />
                  <span className={classes.bold}>Telefon:</span>
                  <h3 className={classes.infoDetail}>+49 17612345678</h3>
                </section>
                <section className={classes.contactDetail}>
                  <MdOutlineMail className={classes.icon} />
                  <span className={classes.bold}>Email:</span>

                  <h3 className={classes.infoDetail}>mauritz.koch@varm.de</h3>
                </section>
              </section>
            </section>
          </li>
          {/* pink */}
          <li
            className={`${classes.section} ${classes.pink} ${classes.gap}`}
            key={1}
          >
            <div className={`${classes.titleBadge} ${classes.pinkBadge}`}>
              <h3 className={classes.badgeTitle}>
                Professionelles Team ⭐⭐⭐⭐⭐{" "}
              </h3>
            </div>
            <section className={classes.sectionFlexWrap}>
              <img
                src={varmWorker.src}
                alt="tracking"
                className={classes.img}
              />
            </section>
          </li>

          {/* green */}
          <li className={`${classes.section} ${classes.green}`} key={2}>
            <div className={`${classes.titleBadge} ${classes.greenBadge}`}>
              <h3 className={classes.badgeTitle}>
                Einspritzdämmung in allen Bereichen
              </h3>
            </div>
            <section className={classes.sectionFlexWrap}>
              {transporterSection.map((section) => (
                <div className={classes.buildingWrapper}>
                  <img
                    src={section.img}
                    alt={section.title}
                    className={classes.img2}
                  />
                  <h3 className={classes.smallBadgeGreen}>{section.title}</h3>
                </div>
              ))}
            </section>
          </li>
          {/* Blue */}
          <li
            className={`${classes.section} ${classes.blue} ${classes.gap}`}
            key={3}
          >
            {badges.map((badge) => (
              <div className={`${classes.titleBadge} ${classes.blueBadge}`}>
                <h3 className={classes.badgeTitle}>{badge}</h3>
              </div>
            ))}
          </li>
        </ul>
      </section>
    </>
  );
}
