import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function StickyCursor({ stickyElement }) {
  const [hovered, setHovered] = useState(false);

  const cursorSize = hovered ? 60 : 20; // Same as the cursor size in scss file
  const mouse = { x: useMotionValue(0), y: useMotionValue(0) };

  const smoothOpts = { damping: 20, stiffness: 300, mass: 0.3 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOpts),
    y: useSpring(mouse.y, smoothOpts),
  };

  useEffect(() => {
    function manageMouseMove(event) {
      const { clientX, clientY } = event;
      const { left, top, height, width } =
        stickyElement.current.getBoundingClientRect();
      const center = { x: left + width / 2, y: top + height / 2 };
      if (hovered) {
        mouse.x.set(center.x - cursorSize / 2);
        mouse.y.set(center.y - cursorSize / 2);
      } else {
        mouse.x.set(clientX - cursorSize / 2);
        mouse.y.set(clientY - cursorSize / 2);
      }
    }

    function manageMouseOver() {
      setHovered(true);
    }

    function manageMouseLeave() {
      setHovered(false);
    }
    stickyElement.current.addEventListener("mouseenter", manageMouseOver);
    stickyElement.current.addEventListener("mouseleave", manageMouseLeave);
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      stickyElement.current.removeEventListener("mouseenter", manageMouseOver);
      stickyElement.current.removeEventListener("mouseleave", manageMouseLeave);
      window.removeEventListener("mousemove", manageMouseMove);
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
