import { FiPhone } from "react-icons/fi";
import classes from "./questions-section.module.css";
import mauritz from "@/public/assets/mauritz.png";
import { MdOutlineMail, MdOutlineSavings } from "react-icons/md";
import { IoMdTime } from "react-icons/io";

import { FaPercent } from "react-icons/fa6";
import Button from "../UI-components/button/button";

export default function QuestionsSection() {
  return (
    <>
      <section className={classes.pageWrapper}>
        <section className={classes.header}>
          <h2 className={classes.title}>Noch Fragen?</h2>
        </section>
        <ul className={classes.sections}>
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
              <h3 className={classes.badgeTitle}>Warum Varm?</h3>
            </div>
            <section className={classes.sectionCol}>
              <section className={classes.valueProp}>
                <span className={classes.iconWrapper}>
                  <FaPercent className={classes.iconValue} />
                </span>
                <section className={classes.valuePropSection}>
                  <h3 className={classes.valuePropTitle}>
                    Bis zu 50% Heizkosten sparen{" "}
                  </h3>
                  <p className={classes.valuePropDescription}>
                    Reduzieren sie ihre Heizkosten erheblich
                  </p>
                </section>
              </section>
              <section className={classes.valueProp}>
                <span className={classes.iconWrapper}>
                  <IoMdTime className={classes.iconValue} />
                </span>
                <section className={classes.valuePropSection}>
                  <h3 className={classes.valuePropTitle}>
                    In nur 30 Tagen gedämmt
                  </h3>
                  <p className={classes.valuePropDescription}>
                    Schnelle und efiziente installation erfolgt an nur einem Tag{" "}
                  </p>
                </section>
              </section>
              <section className={classes.valueProp}>
                <span className={classes.iconWrapper}>
                  <MdOutlineSavings className={classes.iconValue} />
                </span>
                <section className={classes.valuePropSection}>
                  <h3 className={classes.valuePropTitle}>
                    20% Förderungen erhalten{" "}
                  </h3>
                  <p className={classes.valuePropDescription}>
                    Profitieren sie von staatlichen Zuschussen{" "}
                  </p>
                </section>
              </section>
            </section>
          </li>
        </ul>

        <section className={classes.goBackSection}>
          <Button location={"/"}>Zurück zu Varm</Button>
        </section>
      </section>
    </>
  );
}
