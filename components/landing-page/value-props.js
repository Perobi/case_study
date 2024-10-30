import classes from "./value-props.module.css";
import van from "@/public/assets/transporter-types/van.png";
import largeVan from "@/public/assets/transporter-types/large-van.png";
import box from "@/public/assets/transporter-types/box.png";
import largeBox from "@/public/assets/transporter-types/large-box.png";
import tracking from "@/public/assets/tracking.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function ValueProps() {
  const transporterSection = [
    {
      title: "Moverr S",
      img: van.src,
    },
    {
      title: "Moverr M",
      img: largeVan.src,
    },
    {
      title: "Moverr L",
      img: box.src,
    },
    {
      title: "Moverr XL",
      img: largeBox.src,
    },
  ];

  const badges = [
    "Schränke 💪 für deinen Schrank 🗄️️️",
    "Immer voll versichert 💸",
    "Top Fahrer und Helfer ⭐⭐⭐⭐⭐",
    "Pünktlich ⏰ und zuverlässig 🤝",
    "Für dich da, zum Wunschtermin 🗓️",
  ];

  return (
    <>
      <section className={classes.pageSectionWrapper}>
        <h2 className={classes.subTitleSection}>
          Transport & Möbel Lieferung auf Knopfdruck
        </h2>
        <ul className={classes.sections}>
          {/* Green */}
          <li
            className={`${classes.section} ${classes.green} ${classes.gap}`}
            key={1}
          >
            <div className={`${classes.titleBadge} ${classes.greenBadge}`}>
              <h3 className={classes.badgeTitle}>Echtzeit tracking</h3>
            </div>
            <section className={classes.sectionFlexWrap}>
              <h3 className={`${classes.smallBadge} ${classes.absolute}`}>
                2min bis Ankunft
              </h3>

              <img src={tracking.src} alt="tracking" className={classes.img} />
            </section>
          </li>

          {/* Purple */}

          <li
            className={`${classes.section} ${classes.purple} ${classes.gap}`}
            key={4}
          >
            <div className={`${classes.titleBadge} ${classes.purpleBadge} `}>
              <h3 className={classes.badgeTitle}>Zu deinem Wuschtermin</h3>
            </div>
            <section className={classes.sectionDateTimePicker}>
              <section className={classes.col}>
                <h4 className={classes.dateTitle}>Datum</h4>
                {/* new Date() today - 4 days from now */}
                <section className={classes.row}>
                  <div className={`${classes.datePicker} ${classes.active}`}>
                    <div className={classes.placeholderDash} />
                    <span className={classes.date}>
                      {String(new Date().getDate()).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={classes.datePicker}>
                    <div className={classes.placeholderDash} />
                    <span className={classes.date}>
                      {String(new Date().getDate() + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={classes.datePicker}>
                    <div className={classes.placeholderDash} />
                    <span className={classes.date}>
                      {String(new Date().getDate() + 2).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={classes.datePicker}>
                    <div className={classes.placeholderDash} />
                    <span className={classes.date}>
                      {String(new Date().getDate() + 3).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={classes.datePicker}>
                    <div className={classes.placeholderDash} />
                    <MdOutlineKeyboardArrowDown className={classes.icon} />
                  </div>
                </section>
              </section>
              <section className={classes.col}>
                <h4 className={classes.dateTitle}>Zeit</h4>
                {/* new Date() today - 4 days from now */}
                <section className={classes.sectionFlexWrapGap5}>
                  <div className={`${classes.timePicker} ${classes.active}`}>
                    Innerhalb 30 Min
                  </div>
                  <div className={classes.timePicker}>14 - 15 Uhr</div>
                  <div className={classes.timePicker}>15 - 16 Uhr</div>
                  <div className={classes.timePicker}>16 - 17 Uhr</div>
                </section>
              </section>
            </section>
          </li>

          {/* Pink */}
          <li className={`${classes.section} ${classes.pink}`} key={2}>
            <div className={`${classes.titleBadge} ${classes.pinkBadge}`}>
              <h3 className={classes.badgeTitle}>Fahrzeuge in jeder Größe</h3>
            </div>
            <section className={classes.sectionFlexWrap}>
              {transporterSection.map((section) => (
                <div className={classes.transporterWrapper}>
                  <img
                    src={section.img}
                    alt={section.title}
                    className={classes.img}
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
