export interface Product {
  amount: null | string;
  brand_subtype: string | null;
  brand: string;
  cannabinoids: any[];
  category: null | string;
  description: string;
  dosage: string | null;
  effects: any[];
  flavors: any[];
  image_urls: string[];
  ingredients: any[];
  kind_subtype: string | null;
  kind: string;
  custom_product_type: string;
  name: string;
  percent_cbd: number;
  percent_cbda: number;
  percent_thc: number;
  percent_thca: number;
  percent_tac: number;
  product_id: number;
  product_percent_cbd: number;
  product_percent_thc: number;
  review_count: number;
  root_subtype: string | null;
  terpenes: any[];
  type: string;
  photos: any[];
  bucket_price: number;
  price_each: string | null;
  price_eighth_ounce: string | null;
  price_gram: string | null;
  price_half_gram: string | null;
  price_half_ounce: string | null;
  price_ounce: string | null;
  price_quarter_ounce: string | null;
  price_two_gram: string | null;
  max_cart_quantity: number;
  aggregate_rating: number;
}

export async function fetchProducts(): Promise<Product[]> {
  const url = `data/products.json`;
  const response = await fetch(url);
  const { products } = await response.json();
  return products as Product[];
}
