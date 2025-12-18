import { supabase } from "../lib/supabaseClient";

export async function fetchLists(userId) {
  return supabase
    .from("lists")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}
export async function createList({ userId, title, storeKey }) {
  return supabase
    .from("lists")
    .insert({ user_id: userId, title, store_key: storeKey })
    .select()
    .single();
}

export async function deleteList(listId) {
  return supabase.from("lists").delete().eq("id", listId);
}
