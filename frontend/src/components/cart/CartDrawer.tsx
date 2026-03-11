"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-primary border-l border-white/10 shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-primary-light">
              <h2 className="font-heading text-xl uppercase tracking-widest text-ivory flex items-center gap-3">
                <ShoppingBag size={20} className="text-accent" /> Your Cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-ivory/60 hover:text-accent transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-ivory/30 mb-2">
                    <ShoppingBag size={32} />
                  </div>
                  <p className="text-ivory/60 font-body">Your shopping bag is empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 px-6 py-3 border border-accent text-accent uppercase tracking-widest text-sm hover:bg-accent hover:text-primary transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 border border-white/5 p-3 bg-primary-light/30">
                    <div className="w-20 h-24 bg-primary-light relative flex-shrink-0">
                       {item.imageUrl ? (
                         <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center border border-white/5">
                            <span className="text-[10px] text-ivory/30 uppercase">Img</span>
                         </div>
                       )}
                    </div>
                    
                    <div className="flex flex-col flex-grow justify-between">
                      <div className="flex justify-between items-start">
                        <div className="pr-4">
                          <Link 
                            href={`/product/${item.productId}`}
                            onClick={() => setIsCartOpen(false)}
                            className="font-heading text-ivory hover:text-accent transition-colors line-clamp-1 text-sm sm:text-base uppercase tracking-wider mb-1"
                          >
                            {item.name}
                          </Link>
                          <div className="text-xs text-ivory/50 font-body mb-2 flex gap-3">
                            <span className="flex items-center gap-1">Color: <span className={`inline-block w-2.5 h-2.5 rounded-full bg-[${item.color}] outline outline-1 outline-offset-1 outline-white/20`} /></span>
                            {item.size && <span>Size: {item.size}</span>}
                          </div>
                        </div>
                        <span className="text-accent font-body font-bold text-sm whitespace-nowrap">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex border border-white/20 h-8 items-center justify-between px-2 w-20">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-ivory/70 hover:text-accent transition-colors"
                          >
                            -
                          </button>
                          <span className="text-sm text-ivory font-body">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-ivory/70 hover:text-accent transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-ivory/40 hover:text-red-400 transition-colors text-xs flex items-center gap-1 uppercase tracking-widest"
                        >
                          <Trash2 size={14} /> <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/10 p-6 bg-primary-light">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-ivory/70 uppercase tracking-widest text-sm">Subtotal</span>
                  <span className="text-xl font-body font-bold text-accent">
                    Rs. {cartTotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-ivory/50 font-body mb-6">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-4 border border-white/20 text-ivory font-bold uppercase tracking-widest text-sm hover:border-accent hover:text-accent transition-all text-center"
                  >
                    View Cart
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-4 bg-accent text-primary font-bold uppercase tracking-widest text-sm hover:bg-accent-light transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-accent/20"
                  >
                    Checkout <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
