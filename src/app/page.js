"use client";
import Header from "@/components/header";
import styles from "./page.module.scss";
import StickyCursor from "@/components/stickyCursor";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <StickyCursor />
    </main>
  );
}
