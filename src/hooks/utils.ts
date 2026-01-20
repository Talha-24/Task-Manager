import { supabase } from "../database/supabase/supabaseClient";


export const getPurchasedProductIds = async (userId: string | undefined): Promise<string[]> => {

    
  // 1️⃣ Fetch orders from Supabase
  const { data: orders, error } = await supabase
    .from("orders")
    .select("status, product_ids")
    .eq("user_id", userId);

  if (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }

  if (!orders) return [];

  // 2️⃣ Extract purchased product IDs
  return orders
    .filter(order => order.status === "paid")
    .flatMap(order => order.product_ids ?? []);
};