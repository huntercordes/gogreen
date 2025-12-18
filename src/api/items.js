import { supabase } from "../lib/supabaseClient";

export async function fetchItems(listId) {
  return supabase
    .from("items")
    .select("*")
    .eq("list_id", listId)
    .order("created_at", { ascending: false });
}

export async function addItem(item) {
  return supabase.from("items").insert(item).select().single();
}

export async function togglePurchased(itemId, purchased) {
  return supabase.from("items").update({ purchased }).eq("id", itemId);
}

export async function deleteItem(itemId) {
  return supabase.from("items").delete().eq("id", itemId);
}
