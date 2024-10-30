"use client";
import Link from "next/link";
import Button from "../UI-components/button/button";
import classes from "./footer.module.css";
import { FaHeart, FaTruck } from "react-icons/fa";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Footer() {
  const links = [
    {
      title: "Varm",
      links: [
        {
          title: "Einblasdämmung",
          href: "/einblasdaemmung",
        },
        {
          title: "Materialien",
          href: "/materialien",
        },
        {
          title: "Über uns",
          href: "/ueber-uns",
        },
        {
          title: "Freunde empfehlen",
          href: "/freunde-empfehlen",
        },
      ],
    },

    {
      title: "Support",
      links: [
        {
          title: "Kontaktiere uns",
          href: "/kontakt",
        },
        {
          title: "FAQ",
          href: "/faq",
        },
      ],
    },
    {
      title: "Weitere Infos",
      links: [
        {
          title: "Unser Blog",
          href: "/blog",
        },
      ],
    },
  ];

  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);

  const textVariants = [
    "Einblasdämmung?",
    "Heizkosten sparen?",
    "Schallschutz?",
    "Komfort?",
    "Wertsteigerung?",
    "Heizkosten sparen?",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVariantIndex(
        (prevIndex) => (prevIndex + 1) % textVariants.length
      );
    }, 4000); // Change text every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <footer className={classes.wrapper}>
        <section className={classes.row}>
          <section className={classes.col}>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentVariantIndex}
                initial={{ rotateX: 90, opacity: 0, y: -50 }}
                animate={{ rotateX: 0, y: 0, opacity: 1 }}
                exit={{ rotateX: -90, opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                className={classes.themeTextRotation}
              >
                {textVariants[currentVariantIndex]}
              </motion.span>
            </AnimatePresence>
            <h3 className={classes.text}>Kein Problem</h3>
          </section>
          <Button className={classes.buttonPadding}>Angebot erhalten</Button>
        </section>

        <section className={classes.rowGap}>
          {links.map((link, idx) => (
            <section key={idx} className={classes.listCol}>
              <h3 className={classes.listTitle}>{link.title}</h3>
              <ul className={classes.list}>
                {link.links.map((link, idx) => (
                  <li key={idx} className={classes.listItem}>
                    <Link href={link.href}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </section>

        <div className={classes.separator} />
        <section className={classes.row}>
          <section className={classes.rowGap2}>
            <section className={classes.badgeWrapper}>
              <span className={classes.badge}>
                Made with <FaHeart className={classes.star} /> in Berlin
              </span>
            </section>
          </section>
          <section className={classes.rowGap2}>
            <Link className={classes.listItem} href="/datenschutz">
              Datenschutz
            </Link>
            <Link className={classes.listItem} href="/nutzungsbedingungen">
              Nutzungsbedingungen
            </Link>
            <span className={classes.listItem}>
              <span className={classes.themeColor}>©</span> Varm 2024
            </span>
          </section>
        </section>
      </footer>
    </>
  );
}
