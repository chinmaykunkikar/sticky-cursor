import { forwardRef } from "react";
import styles from "./style.module.scss";

const Header = forwardRef(function index(_, ref) {
  return (
    <div className={styles.header}>
      <div ref={ref} className={styles.burger}></div>
    </div>
  );
});

export default Header;
