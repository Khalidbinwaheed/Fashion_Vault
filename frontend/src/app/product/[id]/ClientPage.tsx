"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Truck, ShieldCheck, ArrowLeft, RefreshCw, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import { trendingProducts, newArrivals } from "@/data/mockProducts";
import { useCart } from "@/context/CartContext";

const allProducts = [...trendingProducts, ...newArrivals];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  
  // Find product or use a fallback for demo
  const product = allProducts.find(p => p.id === id) || allProducts[0];
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isZoomed, setIsZoomed] = useState(false);

  // Mock data for the product variations
  const images = [
    product.imageUrl || "", // Main image
    "", // Angle 1
    "", // Angle 2
    "", // Detail
  ];
  
  const colors = [
    { name: "Black", class: "bg-black" },
    { name: "Gold", class: "bg-[#D4AF37]" },
    { name: "Ivory", class: "bg-[#F5F3EF] border border-gray-300" },
  ];
  
  const sizes = ["XS", "S", "M", "L", "XL"];
  
  // Get related products (just picking a few from mock data)
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  if(relatedProducts.length === 0) {
      relatedProducts.push(...allProducts.slice(0, 4));
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl || "",
      color: colors[selectedColor].name,
      size: product.category === "Perfumes" || product.category === "Bags" ? "" : selectedSize,
      quantity,
    });
  };

  return (
    <div className="bg-primary min-h-screen">
      <div className="container mx-auto px-6 md:px-12 py-8">
        
        {/* Breadcrumb & Back */}
        <div className="flex items-center gap-4 text-sm text-ivory/60 font-body mb-8">
          <button onClick={() => window.history.back()} className="flex items-center gap-2 hover:text-accent transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
          <span>/</span>
          <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-accent transition-colors uppercase tracking-wider">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-ivory truncate">{product.name}</span>
        </div>

        {/* Product Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24">
          
          {/* Image Gallery (Left) */}
          <div className="lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 w-full md:w-24 shrink-0">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-24 h-32 md:w-full shrink-0 border-2 transition-all ${selectedImage === idx ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  {img ? (
                    <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary-light flex items-center justify-center">
                      <span className="text-xs text-ivory/30">View {idx + 1}</span>
                    </div>
                  )}
                </button>
              ))}
              
              {/* 360 View Button Placeholder */}
              <button className="relative w-24 h-32 md:w-full shrink-0 border border-white/20 bg-primary-light/50 flex flex-col items-center justify-center gap-2 text-ivory/60 hover:text-accent hover:border-accent transition-all">
                <RefreshCw size={24} />
                <span className="text-[10px] uppercase tracking-widest font-bold">360° View</span>
              </button>
            </div>
            
            {/* Main Image */}
            <div className="relative aspect-[3/4] w-full bg-primary-light overflow-hidden group">
              {images[selectedImage] ? (
                 <Image 
                    src={images[selectedImage]} 
                    alt={product.name} 
                    fill 
                    className={`object-cover transition-transform duration-500 origin-center ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
                    onClick={() => setIsZoomed(!isZoomed)}
                 />
              ) : (
                 <div className="w-full h-full flex items-center justify-center border border-white/5">
                    <span className="text-ivory/20 font-heading text-2xl uppercase tracking-widest">{product.name}</span>
                 </div>
              )}
              
              <button 
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-primary/50 backdrop-blur-md rounded-full flex items-center justify-center text-ivory/70 hover:text-accent hover:bg-primary transition-all opacity-0 group-hover:opacity-100"
              >
                <ZoomIn size={20} />
              </button>
            </div>
          </div>

          {/* Product Info (Right) */}
          <div className="lg:w-1/2 flex flex-col">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-ivory mb-2 leading-tight">
              {product.name}
            </h1>
            
            {/* Price & Rating */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
              <span className="text-2xl text-accent font-body tracking-wider">
                Rs. {product.price.toLocaleString()}
              </span>
              <div className="flex items-center gap-2 text-sm text-ivory/70 font-body">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} />
                  ))}
                </div>
                <span>(128 Reviews)</span>
              </div>
            </div>

            {/* Colors */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm uppercase tracking-widest text-ivory font-bold">Color</span>
                <span className="text-sm text-ivory/60 font-body">{colors[selectedColor].name}</span>
              </div>
              <div className="flex gap-4">
                {colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-10 h-10 rounded-full ${color.class} relative outline outline-2 outline-offset-4 transition-all ${selectedColor === idx ? 'outline-accent' : 'outline-transparent hover:outline-white/20'}`}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            {product.category !== "Perfumes" && product.category !== "Bags" && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm uppercase tracking-widest text-ivory font-bold">Size</span>
                  <button className="text-sm text-accent hover:underline font-body">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 flex items-center justify-center border transition-all font-body ${selectedSize === size ? 'border-accent bg-accent text-primary font-bold' : 'border-white/20 text-ivory hover:border-accent hover:text-accent'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock & Quantity */}
            <div className="flex items-center gap-6 mb-10">
              <div className="flex flex-col">
                <span className="text-sm uppercase tracking-widest text-ivory font-bold mb-3">Quantity</span>
                <div className="flex border border-white/20 h-14 w-32 items-center justify-between px-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-ivory hover:text-accent transition-colors text-xl"
                  >
                    -
                  </button>
                  <span className="text-ivory font-body">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-ivory hover:text-accent transition-colors text-xl"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col self-end pb-3">
                 <span className="text-emerald-400 text-sm font-bold tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    In Stock
                 </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-12">
              <button 
                onClick={handleAddToCart}
                className="flex-grow h-14 bg-accent text-primary font-bold uppercase tracking-widest text-sm hover:bg-accent-light transition-all shadow-lg hover:shadow-accent/20 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <button className="w-14 h-14 border border-white/20 flex items-center justify-center text-ivory hover:text-accent hover:border-accent transition-all shrink-0">
                <Heart size={20} />
              </button>
            </div>

            {/* Pakistani Delivery Estimates */}
            <div className="bg-primary-light border border-white/5 p-6 mb-12 space-y-4">
              <h4 className="font-heading font-bold text-lg text-ivory uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Delivery Estimates</h4>
              <div className="flex items-start gap-4">
                <Truck className="text-accent shrink-0 mt-1" size={24} />
                <div>
                  <div className="font-bold text-ivory text-sm uppercase tracking-wider mb-1">Standard Delivery (Pakistan)</div>
                  <ul className="text-sm text-ivory/70 font-body space-y-1">
                    <li><span className="text-ivory font-bold">Islamabad & Rawalpindi:</span> Same Day / 1 Day</li>
                    <li><span className="text-ivory font-bold">Lahore & Karachi:</span> 1 - 2 Days</li>
                    <li><span className="text-ivory font-bold">Other Cities:</span> 2 - 4 Days</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-4 pt-4 mt-2 border-t border-white/5">
                <ShieldCheck className="text-accent shrink-0 mt-1" size={24} />
                <div>
                  <div className="font-bold text-ivory text-sm uppercase tracking-wider mb-1">Payment Options</div>
                  <p className="text-sm text-ivory/70 font-body">Cash on Delivery (COD), EasyPaisa, JazzCash, and Bank Transfer available at checkout.</p>
                </div>
              </div>
            </div>
            
            {/* Tabs for Description/Details */}
            <div className="border-t border-white/10 pt-8">
              <div className="flex gap-8 border-b border-white/10 mb-6 pb-2">
                 <button 
                  onClick={() => setActiveTab("description")}
                  className={`text-sm uppercase tracking-widest font-bold pb-2 border-b-2 transition-all -mb-[10px] ${activeTab === 'description' ? 'text-accent border-accent' : 'text-ivory/50 border-transparent hover:text-ivory'}`}
                 >
                   Description
                 </button>
                 <button 
                  onClick={() => setActiveTab("details")}
                  className={`text-sm uppercase tracking-widest font-bold pb-2 border-b-2 transition-all -mb-[10px] ${activeTab === 'details' ? 'text-accent border-accent' : 'text-ivory/50 border-transparent hover:text-ivory'}`}
                 >
                   Details & Care
                 </button>
              </div>
              <AnimatePresence mode="wait">
                 <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-ivory/80 font-body leading-relaxed text-sm"
                 >
                    {activeTab === 'description' ? (
                       <p>Experience the epitome of luxury with this exquisite piece from Fashion Vault. Meticulously designed to flatter and inspire, it combines timeless elegance with contemporary flair. Handcrafted by our expert artisans, it ensures both comfort and a striking silhouette. Perfect for formal events or elevating your everyday style.</p>
                    ) : (
                       <ul className="list-disc pl-5 space-y-2">
                          <li>Premium imported fabric</li>
                          <li>Intricate detailing and finishing</li>
                          <li>Dry clean only</li>
                          <li>Do not bleach or tumble dry</li>
                          <li>Iron on low heat</li>
                          <li>Made in Pakistan</li>
                       </ul>
                    )}
                 </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="border-t border-white/10 pt-24 mt-12 pb-12">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-heading font-bold text-ivory uppercase tracking-widest mb-4">
              You May Also Like
            </h3>
            <div className="h-1 w-24 bg-accent mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {relatedProducts.map(rp => (
                <ProductCard key={rp.id} {...rp} />
             ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
