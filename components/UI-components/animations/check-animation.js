"use client";
import Lottie from "lottie-react";
import items from "@/public/assets/animations/check-animation.json";

export default function CheckAnimation() {
  return (
    <>
      <Lottie animationData={items} loop={true} autoplay={true} />
    </>
  );
}
