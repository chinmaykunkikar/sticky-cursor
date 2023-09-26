import { useEffect } from "react";
import styles from "./style.module.scss";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function StickyCursor() {
  const mouse = { x: useMotionValue(0), y: useMotionValue(0) };
  const cursorSize = 20; // Same as the cursor size in scss file

  const smoothOpts = { damping: 20, stiffness: 300, mass: 0.3 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOpts),
    y: useSpring(mouse.y, smoothOpts),
  };

  function manageMouseMove(event) {
    const { clientX, clientY } = event;
    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
  }

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, []);

  return (
    <motion.div
      className={styles.cursor}
      style={{ left: smoothMouse.x, top: smoothMouse.y }}
    ></motion.div>
  );
}
