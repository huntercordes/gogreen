import styles from "./AddItemForm.module.css";
import SuggestedSwaps from "./SuggestedSwaps";

export default function AddItemForm({
  ECO,
  PACKAGING,
  name,
  quantity,
  category,
  ecoScore,
  packaging,
  suggestions,
  catalogHint,
  onNameChange,
  onQuantityChange,
  onCategoryChange,
  onEcoScoreChange,
  onPackagingChange,
  onFindEcoInfo,
  onAdd,
  onAddSwap,
  errorId = "listdetail-error",
  knownItemNames = [], // pass from ListDetailPage later
}) {
  const hintId = "catalog-hint";
  const listId = "known-items";

  const hasName = name.trim().length > 0;

  return (
    <details className={styles.details}>
      <summary className={styles.summaryRow}>
        <div className={styles.summaryLeft}>
          <span className={styles.summaryLabel}>Add item</span>
          <span className={styles.summaryValue}>
            {hasName ? `Item: ${name.trim()}` : "Add a new product to the list"}
          </span>
        </div>

        <span className={styles.chevron} aria-hidden="true" />
      </summary>

      <form
        className={styles.card}
        onSubmit={onAdd}
        aria-label="Add an item to the list">
        <div className={styles.sectionTitle}>Item details</div>

        <div className={styles.row}>
          <div className={styles.grow}>
            <label className={styles.label} htmlFor="itemName">
              Item name
            </label>

            {/* 
              datalist provides lightweight suggestions while typing.
              This avoids heavy UI libraries and improves speed and accessibility.
            */}
            <input
              id="itemName"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className={styles.input}
              required
              autoComplete="off"
              aria-describedby={`${hintId} ${errorId}`}
              list={listId}
            />

            <datalist id={listId}>
              {knownItemNames.slice(0, 15).map((n) => (
                <option key={n} value={n} />
              ))}
            </datalist>
          </div>

          <button
            type="button"
            className={styles.findBtn}
            onClick={onFindEcoInfo}
            aria-describedby={hintId}>
            Find eco info
          </button>
        </div>

        {/* 
          Live region announces catalog results.
          If the item is unknown, show a clear, non-technical message.
        */}
        <p id={hintId} className={styles.hint} role="status" aria-live="polite">
          {catalogHint ||
            "Use “Find eco info” to fill in eco score and packaging from the store catalog."}
        </p>

        <div className={styles.grid2}>
          <div>
            <label className={styles.label} htmlFor="quantity">
              Quantity <span className={styles.optional}>(optional)</span>
            </label>
            <input
              id="quantity"
              value={quantity}
              onChange={(e) => onQuantityChange(e.target.value)}
              placeholder="e.g. 2, 500g"
              className={styles.input}
              autoComplete="off"
            />
          </div>

          <div>
            <label className={styles.label} htmlFor="category">
              Category <span className={styles.optional}>(optional)</span>
            </label>
            <input
              id="category"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              placeholder="e.g. Dairy"
              className={styles.input}
              autoComplete="off"
            />
          </div>
        </div>

        <div className={styles.subPanel} aria-label="Eco details">
          <div className={styles.subPanelTitle}>Eco details</div>

          <div className={styles.grid2}>
            <div>
              <label className={styles.label} htmlFor="ecoScore">
                Eco score
              </label>
              <select
                id="ecoScore"
                value={ecoScore}
                onChange={(e) => onEcoScoreChange(e.target.value)}
                className={styles.select}>
                {ECO.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={styles.label} htmlFor="packaging">
                Packaging
              </label>
              <select
                id="packaging"
                value={packaging}
                onChange={(e) => onPackagingChange(e.target.value)}
                className={styles.select}>
                {PACKAGING.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className={styles.addBtn}>
          Add item
        </button>

        <SuggestedSwaps
          suggestions={suggestions}
          onAddSwap={onAddSwap}
          itemName={name}
        />
      </form>
    </details>
  );
}
