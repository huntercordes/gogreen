import styles from "./SuggestedSwaps.module.css";

export default function SuggestedSwaps({
  suggestions,
  onAddSwap,
  itemName = "",
}) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <section className={styles.box} aria-label="Suggested swaps">
      <h4 className={styles.heading}>Suggested swaps</h4>

      <ul className={styles.list}>
        {suggestions.map((s) => (
          <li key={s} className={styles.row}>
            <span className={styles.name}>{s}</span>

            <button
              type="button"
              className={styles.btn}
              onClick={() => onAddSwap(s)}
              aria-label={`Add suggested swap ${s}${
                itemName ? ` for ${itemName}` : ""
              }`}>
              Add swap
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
