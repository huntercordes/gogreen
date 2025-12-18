import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createList, deleteList, fetchLists } from "../api/lists";

import ListsHeader from "../components/lists/ListsHeader";
import CreateListForm from "../components/lists/CreateListForm";
import ListsList from "../components/lists/ListsList";

import styles from "../styles/ListsPage.module.css";

export default function ListsPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [lists, setLists] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [storeKey, setStoreKey] = useState("gogreen_market");

  const load = useCallback(async () => {
    if (!user?.id) return;
    setError("");
    const { data, error } = await fetchLists(user.id);
    if (error) setError(error.message);
    else setLists(data ?? []);
  }, [user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  const onCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const { error } = await createList({
      userId: user.id,
      title: title.trim(),
      storeKey,
    });

    if (error) setError(error.message);
    else {
      setTitle("");
      load();
    }
  };

  const onDelete = async (id) => {
    await deleteList(id);
    load();
  };

  const onOpen = (id) => navigate(`/lists/${id}`);

  const hasLists = lists.length > 0;

  return (
    <main className={styles.page} aria-labelledby="lists-title">
      <div className={styles.stack}>
        {/* Header component contains the visible h1, so we label main with that h1 id */}
        <ListsHeader
          title="Green Grocery"
          subtitle="Smarter shopping, less waste"
          onLogout={signOut}
        />

        <section className={styles.section} aria-label="Create a new list">
          <CreateListForm
            title={title}
            storeKey={storeKey}
            onTitleChange={setTitle}
            onStoreKeyChange={setStoreKey}
            onSubmit={onCreate}
          />
        </section>

        {error && (
          <p role="alert" className={styles.alert}>
            {error}
          </p>
        )}

        {!hasLists ? (
          <section className={styles.empty} aria-label="No lists yet">
            <h2 className={styles.emptyTitle}>No lists yet</h2>
            <p className={styles.emptyText}>
              Create your first grocery list above to start tracking eco scores
              and swaps.
            </p>
          </section>
        ) : (
          <section className={styles.section} aria-label="Your lists">
            <ListsList lists={lists} onOpen={onOpen} onDelete={onDelete} />
          </section>
        )}
      </div>
    </main>
  );
}
