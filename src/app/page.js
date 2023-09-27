"use client";
import Header from "@/components/header";
import StickyCursor from "@/components/stickyCursor";
import { useRef } from "react";
import styles from "./page.module.scss";

export default function Home() {
  const stickyElement = useRef(null);

  return (
    <main className={styles.main}>
      <Header ref={stickyElement} />
      <StickyCursor stickyElement={stickyElement} />
    </main>
  );
}
