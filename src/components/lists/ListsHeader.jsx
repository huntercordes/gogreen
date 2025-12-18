import styles from "./ListsHeader.module.css";
import logo from "../../assets/logo.png";

export default function ListsHeader({ title, subtitle, onLogout }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {/* Crop the lockup image so it behaves like an icon-only mark */}
        <span className={styles.logoWrap} aria-hidden="true">
          <img
            src={logo}
            alt=""
            className={styles.logo}
            loading="eager"
            decoding="async"
          />
        </span>

        <div className={styles.textGroup}>
          <h1 id="lists-title" className={styles.title}>
            {title}
          </h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>

      <button
        className={styles.logout}
        onClick={onLogout}
        type="button"
        aria-label="Log out of your account">
        Log out
      </button>
    </header>
  );
}
