"use client";
import Lottie from "lottie-react";
import items from "@/public/assets/animations/bubbles.json";

export default function LottieAnimation() {
  return (
    <>
      <Lottie animationData={items} loop={true} autoplay={true} />
    </>
  );
}
