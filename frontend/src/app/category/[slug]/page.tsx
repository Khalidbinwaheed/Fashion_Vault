import CategoryPageClient from "./ClientPage";
import { trendingProducts, newArrivals } from "@/data/mockProducts";

const allProducts = [...trendingProducts, ...newArrivals];

export function generateStaticParams() {
  const categories = Array.from(new Set(allProducts.map(p => p.category.toLowerCase())));
  categories.push("all");
  return categories.map((slug) => ({
    slug,
  }));
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <CategoryPageClient params={params} />;
}
