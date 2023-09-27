import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function StickyCursor({ stickyElement }) {
  const [hovered, setHovered] = useState(false);

  const cursorSize = hovered ? 60 : 20; // Same as the cursor size in scss file

  // For framer to recognize motiona values, we use the useMotionValue hook.
  const mouse = { x: useMotionValue(0), y: useMotionValue(0) };

  // To make the sticky cursor to smoothly follow the pointer
  const smoothOpts = { damping: 20, stiffness: 300, mass: 0.3 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOpts),
    y: useSpring(mouse.y, smoothOpts),
  };

  useEffect(() => {
    function handleMouseMove(event) {
      const { clientX, clientY } = event;
      const { left, top, height, width } =
        stickyElement.current.getBoundingClientRect();

      // Calculate the center of the burger menu.
      const center = { x: left + width / 2, y: top + height / 2 };

      if (hovered) {
        // Set the sticky cursor to the center of the burger
        // when the pointer is moved in the proximity of it.
        mouse.x.set(center.x - cursorSize / 2);
        mouse.y.set(center.y - cursorSize / 2);
      } else {
        // If it's not hovered, stick the cursor to the
        // pointer around the page.
        mouse.x.set(clientX - cursorSize / 2);
        mouse.y.set(clientY - cursorSize / 2);
      }
    }
    const handleMouseOver = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    stickyElement.current.addEventListener("mouseenter", handleMouseOver);
    stickyElement.current.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      stickyElement.current.removeEventListener("mouseenter", handleMouseOver);
      stickyElement.current.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [cursorSize, hovered, mouse.x, mouse.y, stickyElement]);

  return (
    <motion.div
      className={styles.cursor}
      style={{ left: smoothMouse.x, top: smoothMouse.y }}
      animate={{ width: cursorSize, height: cursorSize }}
    ></motion.div>
  );
}
