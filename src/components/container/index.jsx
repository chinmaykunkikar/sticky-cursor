import { forwardRef } from "react";
import styles from "./style.module.scss";
import Magnetic from "@/components/magnetic";

const Container = forwardRef(function index(_, ref) {
  return (
    <div className={styles.container}>
      <Magnetic>
        <div className={styles.burger}>
          <div ref={ref} className={styles.bounds} />
        </div>
      </Magnetic>
    </div>
  );
});

export default Container;
