import Image from "next/image";
import classes from "./static-map.module.css";
import berlinMap from "@/public/assets/maps/berlinMap.png";

export default function StaticMap() {
  return (
    <>
      <section className={classes.mapWrapper}>
        <Image
          src={berlinMap.src}
          alt="Berlin Map"
          height={400}
          width={1240}
          priority
          className={classes.map}
        />
      </section>
    </>
  );
}
