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
      <p className={styles.heading}>Sticky cursor</p>
      <p className={styles.helperText}>
        Move the cursor over and out of the menu icon to see the effect
      </p>
      <p className={styles.noHover}>
        This will not work correctly on a touch-only device
      </p>
    </div>
  );
});

export default Container;
