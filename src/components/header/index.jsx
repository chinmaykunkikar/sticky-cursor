import styles from "./style.module.scss";

export default function Header(props, ref) {
  return (
    <div className={styles.header}>
      <div className={styles.burger}></div>
    </div>
  );
}
