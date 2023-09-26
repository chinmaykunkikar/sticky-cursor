"use client";
import Header from "@/components/header";
import StickyCursor from "@/components/stickyCursor";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <StickyCursor />
    </main>
  );
}
