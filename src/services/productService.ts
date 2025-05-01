
import { supabase } from "@/lib/supabase";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sale_price?: number;
  category: string;
  gender: string;
  images: string[];
  sizes: string[];
  colors: string[];
  in_stock: boolean;
  featured: boolean;
  created_at: string;
  updated_at?: string;
  seller_id?: string;
}

export async function getProducts(
  filters: {
    category?: string;
    gender?: string;
    featured?: boolean;
    priceRange?: [number, number];
    onSale?: boolean;
  } = {}
) {
  let query = supabase.from("products").select("*");

  // Apply filters if provided
  if (filters.category) {
    query = query.eq("category", filters.category);
  }

  if (filters.gender) {
    query = query.eq("gender", filters.gender);
  }

  if (filters.featured !== undefined) {
    query = query.eq("featured", filters.featured);
  }

  if (filters.priceRange) {
    query = query
      .gte("price", filters.priceRange[0])
      .lte("price", filters.priceRange[1]);
  }

  if (filters.onSale) {
    query = query.not("sale_price", "is", null);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data as Product[];
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data as Product;
}

export async function getFeaturedProducts(limit = 6) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .limit(limit);

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  return data as Product[];
}

export async function searchProducts(query: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`name.ilike.%${query}%, description.ilike.%${query}%`);

  if (error) {
    console.error("Error searching products:", error);
    return [];
  }

  return data as Product[];
}

export async function getProductsByGender(gender: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("gender", gender.toLowerCase());

  if (error) {
    console.error("Error fetching products by gender:", error);
    return [];
  }

  return data as Product[];
}

export async function getSaleProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .not("sale_price", "is", null);

  if (error) {
    console.error("Error fetching sale products:", error);
    return [];
  }

  return data as Product[];
}
