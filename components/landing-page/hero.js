import SearchBarRow from "@/components/UI-components/search-bar/search-bar-row";
import classes from "./hero.module.css";
import LottieAnimation from "../UI-components/animations/lottie-animation";
import Image from "next/image";
import varmWorker from "@/public/assets/varmWorker.png";

export default function Hero() {
  return (
    <>
      <section className={classes.hero}>
        <section className={classes.animationWrapper}>
          <LottieAnimation />
        </section>
        <div className={classes.header}>
          <section className={classes.titleWrapper}>
            <h1 className={classes.title}>
              <span className={classes.subTitle}>Bequem & Schnell</span>
              <br />
              Zur <span className={classes.themeColor}>Einspritzdämmung</span>
            </h1>
          </section>
          <h3 className={classes.sectionTitle}>
            Bis zu <span className={classes.themeColor}>50%</span> Heizkosten
            sparen. In nur <span className={classes.themeColor}>3 Tagen</span>{" "}
            gedämmt. <span className={classes.themeColor}>20%</span> Förderung
            erhalten.
          </h3>
        </div>

        <section className={classes.sectionWrapper}>
          <section className={classes.searchBarWrapper}>
            <SearchBarRow />
          </section>

          <section className={classes.imageWraper}>
            <Image
              src={varmWorker.src}
              alt="Varm Worker"
              width={1240}
              height={800}
              className={classes.image}
            />
          </section>
        </section>
      </section>
    </>
  );
}
