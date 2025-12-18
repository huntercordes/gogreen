import styles from "./ItemCard.module.css";

export default function ItemCard({ item, scoreLabel, onToggle, onDelete }) {
  const metaId = `item-meta-${item.id}`;

  return (
    <li
      className={`${styles.card} ${item.purchased ? styles.bought : ""}`}
      aria-label={`Item: ${item.name}`}>
      <div className={styles.row}>
        <div className={styles.info}>
          <strong className={styles.name}>{item.name}</strong>

          <div id={metaId} className={styles.meta}>
            {item.quantity ? `${item.quantity} • ` : ""}
            {item.category ? `${item.category} • ` : ""}
            {scoreLabel(item.eco_score)} • {item.packaging}
          </div>

          {/* Visible text (not color-only) to show state */}
          <div className={styles.stateText}>
            Status: {item.purchased ? "Bought" : "Not bought"}
          </div>
        </div>

        <div className={styles.controls}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={item.purchased}
              onChange={(e) => onToggle(item.id, e.target.checked)}
              aria-describedby={metaId}
              aria-label={`Mark ${item.name} as bought`}
            />
            Bought
          </label>

          <button
            className={styles.delete}
            type="button"
            onClick={() => {
              const ok = window.confirm(
                `Delete "${item.name}" from this list?`
              );
              if (ok) onDelete(item.id);
            }}
            aria-label={`Delete item: ${item.name}`}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
