import styles from "./PageHeader.module.css";

export default function PageHeader({ id, stats, itemsCount, summary, badge }) {
  const hasItems = itemsCount > 0;

  const total = stats.total || 0;
  const bought = stats.bought || 0;
  const progressPct = total > 0 ? Math.round((bought / total) * 100) : 0;

  return (
    <header className={styles.header}>
      <h2 id={id} className={styles.title}>
        List
      </h2>

      <details className={styles.details}>
        <summary className={styles.summaryRow}>
          <div className={styles.summaryLeft}>
            <span className={styles.summaryLabel}>Progress</span>
            <span className={styles.summaryValue}>
              <strong className={styles.summaryNumber}>
                {bought}/{total}
              </strong>{" "}
              bought
            </span>
          </div>

          <span className={styles.chevron} aria-hidden="true" />
        </summary>

        <div className={styles.summaryBarWrap}>
          <div className={styles.barLabel}>
            {bought === 0
              ? "No items purchased yet"
              : `${bought} of ${total} items purchased`}
          </div>

          <div
            className={styles.summaryBarTrack}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={bought}
            aria-label="Shopping list progress">
            <div
              className={styles.summaryBarFill}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.heroMetric}>
            <div className={styles.heroLabel}>List eco score</div>
            <div className={styles.heroValue}>
              {hasItems ? summary.scoreLetter : "—"}
            </div>
          </div>

          {badge && (
            <div className={styles.row}>
              <span className={styles.label}>Current badge</span>
              <span className={styles.value}>{badge.toUpperCase()}</span>
            </div>
          )}

          {hasItems && (
            <div className={styles.grid} aria-label="Packaging breakdown">
              <div className={styles.tile}>
                <span className={styles.tileLabel}>Recyclable</span>
                <span className={styles.tileValue}>{summary.recyclable}</span>
              </div>

              <div className={styles.tile}>
                <span className={styles.tileLabel}>Partly recyclable</span>
                <span className={styles.tileValue}>{summary.partial}</span>
              </div>

              <div className={styles.tile}>
                <span className={styles.tileLabel}>Not recyclable</span>
                <span className={styles.tileValue}>
                  {summary.notRecyclable}
                </span>
              </div>
            </div>
          )}
        </div>
      </details>
    </header>
  );
}
