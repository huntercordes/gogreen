import { supabase } from "../lib/supabaseClient";

export async function updateListScoreAndBadge({ listId, score, badge }) {
  return supabase
    .from("lists")
    .update({ score, badge })
    .eq("id", listId)
    .select("id, score, badge")
    .single();
}

export async function fetchPreviousList({ userId, beforeCreatedAt }) {
  return supabase
    .from("lists")
    .select("id, score, badge, created_at")
    .eq("user_id", userId)
    .lt("created_at", beforeCreatedAt)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
}
