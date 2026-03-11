"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  isNew?: boolean;
}

export default function ProductCard({ id, name, price, category, imageUrl, isNew }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: id,
      name,
      price,
      imageUrl,
      color: "Black", // Default for mock
      size: "M", // Default for mock
      quantity: 1
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-primary-light mb-4">
        {isNew && (
          <div className="absolute top-4 left-4 z-10 bg-accent text-primary text-xs font-bold uppercase tracking-wider px-2 py-1">
            New
          </div>
        )}
        
        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 z-10 text-ivory/50 hover:text-accent transition-colors">
          <Heart size={20} strokeWidth={1.5} />
        </button>

        {/* Product Image Placeholder (Using simple div gradient if no real URL provided) */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-light to-primary border border-white/5 flex items-center justify-center">
             <span className="text-ivory/20 font-heading uppercase tracking-widest text-sm">{category}</span>
          </div>
        )}

        {/* Hover Add to Cart */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-ivory text-primary py-3 flex items-center justify-center gap-2 font-bold uppercase text-xs tracking-wider hover:bg-accent transition-colors"
          >
            <ShoppingBag size={16} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col space-y-1 text-center mt-2">
        <span className="text-ivory/50 text-xs uppercase tracking-widest">{category}</span>
        <Link href={`/product/${id}`} className="font-heading text-lg text-ivory hover:text-accent transition-colors line-clamp-1">
          {name}
        </Link>
        <span className="text-accent font-body">Rs. {price.toLocaleString()}</span>
      </div>
    </motion.div>
  );
}
