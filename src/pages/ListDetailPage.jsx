import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { addItem, deleteItem, fetchItems, togglePurchased } from "../api/items";
import { fetchListById } from "../api/listById";
import { findCatalogItem } from "../api/catalog";
import { fetchPreviousList, updateListScoreAndBadge } from "../api/progress";

import {
  ECO,
  PACKAGING,
  scoreLabel,
  ecoPoints,
  pointsToLetter,
  nextBadge,
} from "../utils/eco";

import PageHeader from "../components/listDetail/PageHeader";
import AddItemForm from "../components/listDetail/AddItemForm";
import ItemsList from "../components/listDetail/ItemsList";

import styles from "../styles/ListDetailPage.module.css";

export default function ListDetailPage() {
  const { id: listId } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [list, setList] = useState(null);
  const [error, setError] = useState("");

  // form state
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [ecoScore, setEcoScore] = useState("C");
  const [packaging, setPackaging] = useState("partial");

  // catalog state
  const [suggestions, setSuggestions] = useState([]);
  const [catalogHint, setCatalogHint] = useState("");

  const errorId = "listdetail-error";
  const itemsHeadingId = "items-heading";

  const load = useCallback(async () => {
    setError("");

    const [
      { data: listData, error: listError },
      { data: itemsData, error: itemsError },
    ] = await Promise.all([fetchListById(listId), fetchItems(listId)]);

    if (listError) setError(listError.message);
    else setList(listData);

    if (itemsError) setError(itemsError.message);
    else setItems(itemsData ?? []);
  }, [listId]);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(() => {
    const total = items.length;
    const bought = items.filter((i) => i.purchased).length;
    return { total, bought };
  }, [items]);

  const summary = useMemo(() => {
    const total = items.length;
    if (total === 0) {
      return {
        avgPoints: null,
        scoreLetter: "—",
        recyclable: 0,
        partial: 0,
        notRecyclable: 0,
      };
    }

    const sum = items.reduce((acc, it) => acc + ecoPoints(it.eco_score), 0);
    const avgPoints = sum / total;

    const recyclable = items.filter((i) => i.packaging === "recyclable").length;
    const partial = items.filter((i) => i.packaging === "partial").length;
    const notRecyclable = items.filter(
      (i) => i.packaging === "not recyclable"
    ).length;

    return {
      avgPoints,
      scoreLetter: pointsToLetter(avgPoints),
      recyclable,
      partial,
      notRecyclable,
    };
  }, [items]);

  // persist score + badge
  useEffect(() => {
    const run = async () => {
      if (!list) return;
      if (!summary.avgPoints) return;

      const userId = list.user_id;
      if (!userId) return;

      let newBadge = list.badge ?? "bronze";

      const { data: prev } = await fetchPreviousList({
        userId,
        beforeCreatedAt: list.created_at,
      });

      if (prev?.score != null && summary.avgPoints > prev.score) {
        newBadge = nextBadge(prev.badge ?? "bronze");
      } else if (!prev) {
        newBadge = "bronze";
      } else {
        newBadge = prev.badge ?? newBadge;
      }

      await updateListScoreAndBadge({
        listId,
        score: summary.avgPoints,
        badge: newBadge,
      });

      setList((l) =>
        l ? { ...l, score: summary.avgPoints, badge: newBadge } : l
      );
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, listId, summary.avgPoints]);

  const onFindEcoInfo = async () => {
    setError("");
    setCatalogHint("");
    setSuggestions([]);

    if (!name.trim()) {
      setCatalogHint("Type an item name first.");
      return;
    }
    if (!list?.store_key) {
      setCatalogHint("Missing store info.");
      return;
    }

    const { data, error } = await findCatalogItem({
      storeKey: list.store_key,
      name,
    });

    if (error) {
      setError(error.message);
      return;
    }

    if (!data) {
      setCatalogHint("No match found in GoGreen Market catalog.");
      return;
    }

    setEcoScore(data.eco_score);
    setPackaging(data.packaging);
    setSuggestions(data.suggestions ?? []);
    setCatalogHint("Eco info found ✅");
  };

  const onAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const { error } = await addItem({
      list_id: listId,
      name: name.trim(),
      quantity: quantity.trim() || null,
      category: category.trim() || null,
      eco_score: ecoScore,
      packaging,
    });

    if (error) setError(error.message);
    else {
      setName("");
      setQuantity("");
      setCategory("");
      setEcoScore("C");
      setPackaging("partial");
      setSuggestions([]);
      setCatalogHint("");
      load();
    }
  };

  const onAddSwap = async (swapName) => {
    if (!list?.store_key) return;

    const { data } = await findCatalogItem({
      storeKey: list.store_key,
      name: swapName,
    });

    await addItem({
      list_id: listId,
      name: swapName,
      quantity: null,
      category: data?.category ?? null,
      eco_score: data?.eco_score ?? "C",
      packaging: data?.packaging ?? "partial",
    });

    load();
  };

  const onToggle = async (itemId, checked) => {
    await togglePurchased(itemId, checked);
    load();
  };

  const onDeleteItem = async (itemId) => {
    await deleteItem(itemId);
    load();
  };

  return (
    <main className={styles.page} aria-labelledby="list-detail-title">
      {/* Skip link: helps keyboard + screen reader users jump past the form */}
      <a className={styles.skipLink} href="#items-section">
        Skip to items
      </a>

      <button
        className={styles.backBtn}
        type="button"
        onClick={() => navigate("/")}>
        ← Back to lists
      </button>

      {/* PageHeader should contain the visible heading. We’ll label main with it. */}
      <PageHeader
        id="list-detail-title"
        stats={stats}
        itemsCount={items.length}
        summary={summary}
        badge={list?.badge ?? null}
      />

      <AddItemForm
        ECO={ECO}
        PACKAGING={PACKAGING}
        name={name}
        quantity={quantity}
        category={category}
        ecoScore={ecoScore}
        packaging={packaging}
        suggestions={suggestions}
        catalogHint={catalogHint}
        onNameChange={setName}
        onQuantityChange={setQuantity}
        onCategoryChange={setCategory}
        onEcoScoreChange={setEcoScore}
        onPackagingChange={setPackaging}
        onFindEcoInfo={onFindEcoInfo}
        onAdd={onAdd}
        onAddSwap={onAddSwap}
        errorId={errorId}
      />

      {error && (
        <p id={errorId} role="alert" className={styles.alert}>
          {error}
        </p>
      )}

      <section id="items-section" aria-labelledby={itemsHeadingId}>
        <h3 id={itemsHeadingId} className={styles.itemsHeading}>
          Items
        </h3>

        <ItemsList
          items={items}
          scoreLabel={scoreLabel}
          onToggle={onToggle}
          onDelete={onDeleteItem}
        />
      </section>
    </main>
  );
}
