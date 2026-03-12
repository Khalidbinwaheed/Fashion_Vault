"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import { trendingProducts } from "@/data/mockProducts";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] md:h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={process.env.NODE_ENV === 'production' ? '/Fashion_Vault/images/hero-banner.png' : '/images/hero-banner.png'}
            alt="Fashion Vault Luxury Collection"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-primary/60 bg-gradient-to-t from-primary via-primary/30 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ivory mb-6 max-w-4xl tracking-wide leading-tight"
          >
            Unlock Your Style with <br className="hidden md:block" />
            <span className="text-luxury-gradient block mt-2">Fashion Vault</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-ivory/80 text-base sm:text-lg md:text-xl font-body max-w-2xl mb-10 leading-relaxed"
          >
            Discover the pinnacle of Pakistani luxury fashion. Experience elegance redefined with our premium collections of clothing, bags, and perfumes.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto"
          >
            <Link
              href="/category/women"
              className="px-8 py-4 bg-accent text-primary font-bold uppercase tracking-widest text-sm hover:bg-accent-light transition-all shadow-lg hover:shadow-accent/20 w-full sm:w-auto text-center"
            >
              Shop Women
            </Link>
            <Link
              href="/category/men"
              className="px-8 py-4 bg-primary/20 backdrop-blur-sm border border-accent text-accent font-bold uppercase tracking-widest text-sm hover:bg-accent hover:text-primary transition-all shadow-lg w-full sm:w-auto text-center"
            >
              Shop Men
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Shop Categories / Featured Collections */}
      <section className="py-24 bg-primary text-center border-t border-white/5 relative">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-ivory uppercase tracking-widest mb-4">
              Explore Collections
            </h3>
            <div className="h-1 w-24 bg-accent mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Link href="/category/women" className="group relative h-96 overflow-hidden bg-primary-light border border-white/5 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light z-0 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <h4 className="relative z-20 text-2xl font-heading uppercase text-ivory tracking-widest group-hover:text-accent transition-colors">Women</h4>
            </Link>
            <Link href="/category/men" className="group relative h-96 overflow-hidden bg-primary-light border border-white/5 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light z-0 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <h4 className="relative z-20 text-2xl font-heading uppercase text-ivory tracking-widest group-hover:text-accent transition-colors">Men</h4>
            </Link>
            <Link href="/category/perfumes" className="group relative h-96 overflow-hidden bg-primary-light border border-white/5 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light z-0 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <h4 className="relative z-20 text-2xl font-heading uppercase text-ivory tracking-widest group-hover:text-accent transition-colors">Perfumes</h4>
            </Link>
            <Link href="/category/accessories" className="group relative h-96 overflow-hidden bg-primary-light border border-white/5 flex items-center justify-center md:hidden lg:flex">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light z-0 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <h4 className="relative z-20 text-2xl font-heading uppercase text-ivory tracking-widest group-hover:text-accent transition-colors">Accessories</h4>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-24 bg-primary-light border-t border-white/5 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h3 className="text-3xl font-heading font-bold text-ivory uppercase tracking-widest mb-4">
                Trending Now
              </h3>
              <div className="h-1 w-24 bg-accent"></div>
            </div>
            <Link href="/trending" className="hidden md:inline-block text-accent uppercase tracking-widest text-sm hover:text-accent-light transition-colors border-b border-accent pb-1">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <Link href="/trending" className="inline-block px-8 py-4 border border-accent text-accent uppercase tracking-widest text-sm w-full">
              View All Trending
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-primary border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 flex flex-col items-start"
            >
              <h3 className="text-3xl md:text-5xl font-heading font-bold text-ivory uppercase tracking-widest mb-6">
                The Fashion Vault <br /> <span className="text-luxury-gradient">Legacy</span>
              </h3>
              <p className="text-ivory/80 font-body text-lg leading-relaxed mb-8">
                Born in the heart of Islamabad, Fashion Vault was created with a singular vision: to redefine luxury shopping in Pakistan. We blend traditional craftsmanship with contemporary design to offer a curated selection of premium apparel, accessories, and fragrances.
              </p>
              <p className="text-ivory/80 font-body text-lg leading-relaxed mb-10">
                Every piece in our collection tells a story of elegance and sophistication, designed for those who appreciate the finer things in life.
              </p>
              <Link href="/about" className="px-8 py-4 border border-accent text-accent font-bold uppercase tracking-widest text-sm hover:bg-accent hover:text-primary transition-colors">
                Discover Our Story
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative h-[500px] w-full"
            >
              <div className="absolute inset-0 bg-primary-light border border-white/10 flex items-center justify-center overflow-hidden">
                {/* Abstract placeholder for story image */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="w-64 h-64 border border-accent/20 rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 border border-accent/40 rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instagram Feed / Newsletter */}
      <section className="py-20 bg-primary-light border-t border-white/5 flex flex-col items-center justify-center text-center px-6">
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-ivory uppercase tracking-widest mb-4">
          Join The Vault
        </h3>
        <p className="text-ivory/70 max-w-xl mx-auto mb-8 font-body">
          Subscribe to receive updates on exclusive releases, early access to collections, and styling advice.
        </p>
        <form className="flex w-full max-w-md border-b border-ivory/30 pb-2 focus-within:border-accent transition-colors">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-grow bg-transparent text-ivory placeholder:text-ivory/40 focus:outline-none px-2 font-body"
            required
          />
          <button type="submit" className="text-accent font-bold uppercase tracking-wider text-sm hover:text-accent-light transition-colors px-4">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
