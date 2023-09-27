import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function StickyCursor({ stickyElement }) {
  const [hovered, setHovered] = useState(false);

  const cursorSize = hovered ? 96 : 40; // Same as the cursor size in scss file

  // For framer to recognize motion values, we use the useMotionValue hook.
  const mouse = { x: useMotionValue(16), y: useMotionValue(16) };

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

      // Distance between the cursor and the center of burger menu.
      const distance = { x: clientX - center.x, y: clientY - center.y };

      if (hovered) {
        // Set the sticky cursor to the center of the burger
        // when the pointer is moved in the proximity of it.
        // mouse.x.set(center.x - cursorSize / 2); (Do for y as well)
        // Now, slightly move it towards the mouse pointer where ever it is.
        mouse.x.set(center.x - cursorSize / 2 + distance.x * 0.1);
        mouse.y.set(center.y - cursorSize / 2 + distance.y * 0.1);
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
    />
  );
}
