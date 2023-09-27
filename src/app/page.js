"use client";
import Container from "@/components/container";
import StickyCursor from "@/components/stickyCursor";
import { useRef } from "react";
import styles from "./page.module.scss";

export default function Home() {
  const stickyElement = useRef(null);

  return (
    <main className={styles.main}>
      <Container ref={stickyElement} />
      <StickyCursor stickyElement={stickyElement} />
    </main>
  );
}
