import Link from "next/link";
import classes from "./navigation-bar.module.css";
import logo from "@/public/assets/logo.png";
import Button from "../UI-components/button/button";
import Image from "next/image";

export default function NavigationBar() {
  return (
    <header className={classes.wrapper}>
      <div className={classes.navigationInner}>
        <section className={classes.logoWrapper}>
          <Link href="/">
            <Image
              priority
              width={100}
              height={30}
              src={logo.src}
              alt="Varm Logo"
              className={classes.logo}
            />
          </Link>

          <span className={classes.slogan}>
            Einspritzdämmung Bequem & Schnell
          </span>
        </section>
        <nav className={classes.navList}>
          <ul className={classes.navLinks}>
            <li className={classes.navLink}>
              <span className={classes.link}>Standorte</span>
            </li>
            <li className={classes.navLink}>
              <span className={classes.link}>Ratgeber</span>
            </li>
            <li className={classes.navLink}>
              <span className={classes.link}>Über uns</span>
            </li>
            <li className={classes.navLink}>
              <span className={classes.link}>Freunde empfehlen</span>
            </li>
          </ul>

          <Button location={"/"}>Angebot erhalten</Button>
        </nav>
      </div>
    </header>
  );
}
