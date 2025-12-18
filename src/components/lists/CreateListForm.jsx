import styles from "./CreateListForm.module.css";

export default function CreateListForm({
  title,
  storeKey,
  onTitleChange,
  onStoreKeyChange,
  onSubmit,
  errorId = "lists-error",
}) {
  const titleHintId = "list-title-hint";

  return (
    <section className={styles.card} aria-label="Create a new list">
      <h2 className={styles.cardTitle}>Create list</h2>

      <form
        className={styles.formRow}
        onSubmit={onSubmit}
        aria-describedby={errorId}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="storeKey">
            Store
          </label>
          <select
            id="storeKey"
            className={styles.select}
            value={storeKey}
            onChange={(e) => onStoreKeyChange(e.target.value)}>
            <option value="gogreen_market">GoGreen Market</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="listTitle">
            List title
          </label>
          <input
            id="listTitle"
            className={styles.input}
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g. Weekly shopping"
            required
            autoComplete="off"
            aria-describedby={titleHintId}
          />
          <p id={titleHintId} className={styles.hint}>
            Give the list a short, descriptive name.
          </p>
        </div>

        <button className={styles.addBtn} type="submit">
          Add list
        </button>
      </form>
    </section>
  );
}
