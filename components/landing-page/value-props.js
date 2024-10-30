import classes from "./value-props.module.css";
import van from "@/public/assets/transporter-types/van.png";
import largeVan from "@/public/assets/transporter-types/large-van.png";
import box from "@/public/assets/transporter-types/box.png";
import largeBox from "@/public/assets/transporter-types/large-box.png";

import basementCeiling from "@/public/assets/einspritztypes/basementCeiling.png";
import facade from "@/public/assets/einspritztypes/facade.png";
import roof from "@/public/assets/einspritztypes/roof.png";
import topFloorCeiling from "@/public/assets/einspritztypes/topFloorCeiling.png";

import varmWorker from "@/public/assets/varmWorker.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

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
        <ul className={classes.sections}>
          {/* pink */}
          <li
            className={`${classes.section} ${classes.pink} ${classes.gap}`}
            key={1}
          >
            <div className={`${classes.titleBadge} ${classes.pinkBadge}`}>
              <h3 className={classes.badgeTitle}>
                Professionelle Teams ⭐⭐⭐⭐⭐{" "}
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
            <section className={classes.sectionAnsprechspartner}></section>
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
                <div className={classes.transporterWrapper}>
                  <img
                    src={section.img}
                    alt={section.title}
                    className={classes.img2}
                  />
                  <h3 className={classes.smallBadge}>{section.title}</h3>
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
