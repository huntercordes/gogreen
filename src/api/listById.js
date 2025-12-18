import { supabase } from "../lib/supabaseClient";

export async function fetchListById(listId) {
  return supabase
    .from("lists")
    .select("id, title, store_key, score, badge, created_at, user_id")
    .eq("id", listId)
    .single();
}
