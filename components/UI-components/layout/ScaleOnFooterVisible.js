"use client";

import { useEffect } from "react";

export default function ScaleOnFooterVisible({
  contentSelector,
  footerSelector,
}) {
  useEffect(() => {
    const content = document.querySelector(contentSelector);
    const footer = document.querySelector(footerSelector);

    if (!content || !footer) return;

    const handleScroll = () => {
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if footer is visible
      if (footerRect.top <= windowHeight && footerRect.bottom >= 0) {
        // Calculate the distance from the bottom of the footer to the bottom of the viewport
        const footerToBottom = windowHeight - footerRect.top;

        // Determine the scale factor
        const scale = Math.max(0.9, 1 - footerToBottom / (windowHeight * 8)); // Adjust divisor for slower scaling

        // Apply the transform to the content
        content.style.transform = `scale(${scale})`;
      } else {
        // Reset scale to 1 when scrolling up or when footer is not visible
        content.style.transform = `scale(1)`;
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    // Clean up on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [contentSelector, footerSelector]);

  return null; // No need to render anything
}
