"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, User, Heart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Men", href: "/category/men" },
  { name: "Women", href: "/category/women" },
  { name: "Accessories", href: "/category/accessories" },
  { name: "Perfumes", href: "/category/perfumes" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary/90 backdrop-blur-md shadow-lg border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-3 items-center">
        {/* Mobile Menu Button - Left */}
        <div className="flex items-center justify-start md:hidden">
          <button
            className="text-ivory hover:text-accent transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>

        {/* Desktop Navigation - Left */}
        <nav className="hidden md:flex items-center space-x-8 justify-start">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-widest text-ivory/80 hover:text-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Logo - Center */}
        <div className="flex items-center justify-center">
          <Link href="/" className="flex-shrink-0 text-center">
            <h1 className="font-heading text-xl sm:text-2xl md:text-3xl tracking-wider uppercase font-bold text-ivory whitespace-nowrap">
              Fashion Vault
            </h1>
          </Link>
        </div>

        {/* Action Icons - Right */}
        <div className="flex items-center justify-end space-x-4 md:space-x-6 text-ivory">
          <button className="hover:text-accent transition-colors hidden sm:block">
            <Search size={22} strokeWidth={1.5} />
          </button>
          <Link href="/account" className="hover:text-accent transition-colors hidden sm:block">
            <User size={22} strokeWidth={1.5} />
          </Link>
          <Link href="/wishlist" className="hover:text-accent transition-colors hidden sm:block">
            <Heart size={22} strokeWidth={1.5} />
          </Link>
          <button 
            className="hover:text-accent transition-colors relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-primary text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-full sm:w-80 bg-primary/95 backdrop-blur-xl z-[60] shadow-2xl flex flex-col border-r border-white/10"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-heading text-xl uppercase tracking-widest text-accent">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-ivory hover:text-accent transition"
              >
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="flex flex-col py-8 px-6 space-y-6 flex-grow">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg uppercase tracking-wider text-ivory hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="p-6 border-t border-white/10 flex justify-between">
              <Link href="/account" className="flex flex-col items-center gap-2 text-ivory/70 hover:text-accent transition-colors">
                <User size={24} strokeWidth={1.5} />
                <span className="text-xs uppercase">Account</span>
              </Link>
              <Link href="/wishlist" className="flex flex-col items-center gap-2 text-ivory/70 hover:text-accent transition-colors">
                <Heart size={24} strokeWidth={1.5} />
                <span className="text-xs uppercase">Wishlist</span>
              </Link>
              <button className="flex flex-col items-center gap-2 text-ivory/70 hover:text-accent transition-colors">
                <Search size={24} strokeWidth={1.5} />
                <span className="text-xs uppercase">Search</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
