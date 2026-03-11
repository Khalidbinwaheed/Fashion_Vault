import ProductPageClient from "./ClientPage";
import { trendingProducts, newArrivals } from "@/data/mockProducts";

const allProducts = [...trendingProducts, ...newArrivals];

export function generateStaticParams() {
  return allProducts.map((product) => ({
    id: product.id,
  }));
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <ProductPageClient params={params} />;
}
