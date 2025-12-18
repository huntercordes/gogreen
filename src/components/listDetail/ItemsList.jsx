import styles from "./ItemsList.module.css";
import ItemCard from "./ItemCard";

export default function ItemsList({ items, scoreLabel, onToggle, onDelete }) {
  if (!items || items.length === 0) {
    return (
      <div className={styles.empty} role="status" aria-live="polite">
        <h4 className={styles.emptyTitle}>No items yet</h4>
        <p className={styles.emptyText}>
          Add your first item above to start tracking progress and eco score.
        </p>
      </div>
    );
  }

  return (
    <ul className={styles.list} aria-label="Items in this list">
      {items.map((it) => (
        <ItemCard
          key={it.id}
          item={it}
          scoreLabel={scoreLabel}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
