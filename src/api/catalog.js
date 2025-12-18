import { supabase } from "../lib/supabaseClient";

export async function findCatalogItem({ storeKey, name }) {
  // exact match for MVP; later you can add ilike search suggestions
  return supabase
    .from("catalog_items")
    .select("*")
    .eq("store_key", storeKey)
    .ilike("name", name.trim())
    .limit(1)
    .maybeSingle();
}
