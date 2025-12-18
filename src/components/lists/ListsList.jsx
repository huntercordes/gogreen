import styles from "./ListsList.module.css";
import ListCard from "./ListCard";

export default function ListsList({ lists, onOpen, onDelete }) {
  return (
    <ul className={styles.list} aria-label="Grocery lists">
      {lists.map((l) => (
        <ListCard key={l.id} list={l} onOpen={onOpen} onDelete={onDelete} />
      ))}
    </ul>
  );
}
