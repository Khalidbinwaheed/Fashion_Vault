"use client";

import { useState, use } from "react";
import { Filter, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { trendingProducts, newArrivals } from "@/data/mockProducts";

// Combine mock products for the listing page
const allProducts = [...trendingProducts, ...newArrivals];

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  
  // Basic filtering based on slug
  const categoryProducts = allProducts.filter(p => 
    slug === "all" ? true : p.category.toLowerCase() === slug.toLowerCase()
  );

  return (
    <div className="container mx-auto px-6 md:px-12 py-12">
      {/* Page Header */}
      <div className="mb-12 border-b border-white/10 pb-6">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-ivory uppercase tracking-widest mb-4">
          {slug.charAt(0).toUpperCase() + slug.slice(1)} Collection
        </h1>
        <p className="text-ivory/60 font-body max-w-2xl">
          Discover our curated selection of luxury {slug} products. Designed with modern aesthetics and traditional craftsmanship.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Mobile Filter Toggle */}
        <div className="flex lg:hidden justify-between items-center mb-6">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 border border-white/20 px-4 py-2 hover:border-accent hover:text-accent transition-colors text-sm uppercase tracking-wider"
          >
            <Filter size={18} />
            Filters
          </button>
          
          <div className="relative">
            <select 
              className="appearance-none bg-transparent border border-white/20 px-4 py-2 pr-10 hover:border-accent hover:text-accent transition-colors text-sm uppercase tracking-wider focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest" className="bg-primary text-ivory">Newest</option>
              <option value="price-low" className="bg-primary text-ivory">Price: Low to High</option>
              <option value="price-high" className="bg-primary text-ivory">Price: High to Low</option>
              <option value="popular" className="bg-primary text-ivory">Most Popular</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Sidebar Filters */}
        <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-32 space-y-10">
            
            {/* Sort (Desktop) */}
            <div className="hidden lg:block">
              <h3 className="text-lg font-heading font-bold uppercase tracking-widest mb-4 pb-2 border-b border-white/10">Sort By</h3>
              <div className="relative">
                <select 
                  className="w-full appearance-none bg-transparent border border-white/20 px-4 py-3 pr-10 hover:border-accent focus:border-accent transition-colors text-sm uppercase tracking-wider focus:outline-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest" className="bg-primary text-ivory">Newest</option>
                  <option value="price-low" className="bg-primary text-ivory">Price: Low to High</option>
                  <option value="price-high" className="bg-primary text-ivory">Price: High to Low</option>
                  <option value="popular" className="bg-primary text-ivory">Most Popular</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ivory/50" />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-heading font-bold uppercase tracking-widest mb-4 pb-2 border-b border-white/10">Categories</h3>
              <ul className="space-y-3 font-body text-sm text-ivory/70">
                <li><label className="flex items-center gap-3 cursor-pointer hover:text-accent"><input type="checkbox" className="accent-accent" /> Clothing</label></li>
                <li><label className="flex items-center gap-3 cursor-pointer hover:text-accent"><input type="checkbox" className="accent-accent" /> Bags</label></li>
                <li><label className="flex items-center gap-3 cursor-pointer hover:text-accent"><input type="checkbox" className="accent-accent" /> Perfumes</label></li>
                <li><label className="flex items-center gap-3 cursor-pointer hover:text-accent"><input type="checkbox" className="accent-accent" /> Accessories</label></li>
              </ul>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-heading font-bold uppercase tracking-widest mb-4 pb-2 border-b border-white/10">Price Range</h3>
              <div className="space-y-4">
                <input type="range" min="0" max="100000" className="w-full accent-accent" />
                <div className="flex justify-between text-xs font-body text-ivory/50">
                  <span>Rs. 0</span>
                  <span>Rs. 100,000+</span>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div>
              <h3 className="text-lg font-heading font-bold uppercase tracking-widest mb-4 pb-2 border-b border-white/10">Color</h3>
              <div className="flex gap-3 flex-wrap">
                {['bg-black', 'bg-white', 'bg-red-800', 'bg-emerald-800', 'bg-[#D4AF37]', 'bg-blue-900'].map((color, i) => (
                  <button key={i} className={`w-8 h-8 rounded-full ${color} border border-white/20 hover:scale-110 hover:border-accent transition-all`}></button>
                ))}
              </div>
            </div>
            
            <button className="w-full py-4 bg-primary-light border border-white/10 text-ivory uppercase tracking-widest text-sm hover:bg-accent hover:text-primary transition-colors font-bold">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          <div className="mb-6 text-sm text-ivory/50 font-body">
            Showing {categoryProducts.length} results
          </div>
          
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="py-24 flex flex-col items-center justify-center border border-white/5 bg-primary-light/50">
              <p className="text-ivory/60 font-body text-lg mb-4">No products found in this category.</p>
              <button 
                onClick={() => window.history.back()}
                className="px-6 py-3 border border-accent text-accent uppercase tracking-widest text-sm hover:bg-accent hover:text-primary transition-colors"
              >
                Go Back
              </button>
            </div>
          )}
          
          {/* Pagination */}
          {categoryProducts.length > 0 && (
            <div className="mt-16 flex justify-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center border border-accent bg-accent text-primary font-bold">1</button>
              <button className="w-10 h-10 flex items-center justify-center border border-white/20 text-ivory hover:border-accent hover:text-accent transition-colors hover:bg-white/5">2</button>
              <button className="w-10 h-10 flex items-center justify-center border border-white/20 text-ivory hover:border-accent hover:text-accent transition-colors hover:bg-white/5">3</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
