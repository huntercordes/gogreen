import styles from "./ListCard.module.css";

export default function ListCard({ list, onOpen, onDelete }) {
  const createdLabel = new Date(list.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <li className={styles.card}>
      {/* 
        Primary action area. Kept as a button for keyboard accessibility.
        The aria-label makes the action explicit to screen reader users.
      */}
      <button
        className={styles.openArea}
        type="button"
        onClick={() => onOpen(list.id)}
        aria-label={`Open list: ${list.title}`}>
        <strong className={styles.title}>{list.title}</strong>

        <div className={styles.meta}>
          Created:{" "}
          <time
            dateTime={list.created_at}
            aria-label={`Created ${createdLabel}`}>
            {createdLabel}
          </time>
        </div>
      </button>

      <div className={styles.actions}>
        {/* 
          Visible affordance for sighted users.
          Uses the same navigation action as the open area.
        */}
        <button
          className={styles.view}
          type="button"
          onClick={() => onOpen(list.id)}
          aria-label={`View list: ${list.title}`}>
          View
        </button>

        <button
          className={styles.delete}
          type="button"
          onClick={() => {
            const ok = window.confirm(`Delete the list "${list.title}"?`);
            if (ok) onDelete(list.id);
          }}
          aria-label={`Delete list: ${list.title}`}>
          Delete
        </button>
      </div>
    </li>
  );
}
