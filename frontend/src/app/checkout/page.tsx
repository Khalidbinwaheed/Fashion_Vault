"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck } from "lucide-react";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "Islamabad",
    paymentMethod: "cod"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      clearCart();
    }, 1500);
  };

  const shippingCost = formData.city === "Islamabad" || formData.city === "Rawalpindi" ? 0 : 250;
  const total = cartTotal + shippingCost;

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-6 animate-pulse">
           <CheckCircle2 size={40} />
        </div>
        <h1 className="font-heading text-4xl text-ivory mb-4 uppercase tracking-widest">Order Confirmed</h1>
        <p className="text-ivory/70 font-body mb-8 max-w-md">
          Thank you for choosing Fashion Vault. Your order has been placed successfully and will be processed shortly.
        </p>
        <div className="bg-primary-light p-6 w-full max-w-md border border-white/5 mb-8 text-left">
           <p className="text-sm text-ivory/60 font-body mb-2">Order Tracking ID</p>
           <p className="font-bold text-accent tracking-widest uppercase">FV-PK-{Math.floor(100000 + Math.random() * 900000)}</p>
        </div>
        <Link 
          href="/"
          className="px-8 py-4 bg-accent text-primary font-bold uppercase tracking-widest text-sm hover:bg-accent-light transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-primary min-h-screen">
      <div className="container mx-auto px-6 md:px-12 py-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-white/10 pb-8 gap-4">
           <div>
             <h1 className="text-3xl font-heading uppercase tracking-widest text-ivory mb-2">Checkout</h1>
             <p className="text-sm font-body text-ivory/60 font-bold">Secure Payment & Fast Delivery across Pakistan</p>
           </div>
           <Link href="/cart" className="flex items-center gap-2 text-sm text-ivory/60 hover:text-accent font-bold uppercase tracking-widest transition-colors">
              <ArrowLeft size={16} /> Return to Cart
           </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Form Section */}
          <div className="lg:w-[60%] order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Contact Information */}
              <div>
                <h2 className="text-xl font-heading text-ivory uppercase tracking-widest mb-6 border-b border-white/10 pb-3">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-ivory/60 uppercase tracking-wider font-bold">First Name</label>
                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-primary-light border border-white/20 p-3 text-ivory focus:border-accent outline-none font-body transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-ivory/60 uppercase tracking-wider font-bold">Last Name</label>
                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-primary-light border border-white/20 p-3 text-ivory focus:border-accent outline-none font-body transition-colors" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs text-ivory/60 uppercase tracking-wider font-bold">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-primary-light border border-white/20 p-3 text-ivory focus:border-accent outline-none font-body transition-colors" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs text-ivory/60 uppercase tracking-wider font-bold">Phone Number (Pakistan)</label>
                    <input required type="tel" placeholder="+92 3XX XXXXXXX" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-primary-light border border-white/20 p-3 text-ivory focus:border-accent outline-none font-body transition-colors" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-xl font-heading text-ivory uppercase tracking-widest mb-6 border-b border-white/10 pb-3">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs text-ivory/60 uppercase tracking-wider font-bold">Street Address</label>
                    <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-primary-light border border-white/20 p-3 text-ivory focus:border-accent outline-none font-body transition-colors" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs text-ivory/60 uppercase tracking-wider font-bold">Apartment, suite, etc. (optional)</label>
                    <input type="text" name="apartment" value={formData.apartment} onChange={handleInputChange} className="w-full bg-primary-light border border-white/20 p-3 text-ivory focus:border-accent outline-none font-body transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-ivory/60 uppercase tracking-wider font-bold">City</label>
                    <select required name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-primary-light border border-white/20 p-3 text-ivory focus:border-accent outline-none font-body transition-colors appearance-none cursor-pointer">
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Quetta">Quetta</option>
                      <option value="Multan">Multan</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-ivory/60 uppercase tracking-wider font-bold">Country</label>
                    <input type="text" value="Pakistan" disabled className="w-full bg-primary-light/50 border border-white/10 p-3 text-ivory/50 outline-none font-body cursor-not-allowed" />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-xl font-heading text-ivory uppercase tracking-widest mb-6 border-b border-white/10 pb-3 flex items-center gap-3">
                   Payment Method <ShieldCheck size={20} className="text-accent" />
                </h2>
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border cursor-pointer transition-colors ${formData.paymentMethod === 'cod' ? 'border-accent bg-accent/5' : 'border-white/20 hover:border-white/40'}`}>
                    <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} className="w-4 h-4 accent-accent mr-4" />
                    <div>
                      <div className="font-bold text-ivory">Cash on Delivery (COD)</div>
                      <div className="text-xs text-ivory/60 font-body">Pay with cash upon delivery.</div>
                    </div>
                  </label>
                  <label className={`flex items-center p-4 border cursor-pointer transition-colors ${formData.paymentMethod === 'easypaisa' ? 'border-accent bg-accent/5' : 'border-white/20 hover:border-white/40'}`}>
                    <input type="radio" name="paymentMethod" value="easypaisa" checked={formData.paymentMethod === 'easypaisa'} onChange={handleInputChange} className="w-4 h-4 accent-accent mr-4" />
                    <div>
                      <div className="font-bold text-ivory">EasyPaisa / JazzCash</div>
                      <div className="text-xs text-ivory/60 font-body">Pay instantly via mobile wallet.</div>
                    </div>
                  </label>
                  <label className={`flex items-center p-4 border cursor-pointer transition-colors ${formData.paymentMethod === 'bank' ? 'border-accent bg-accent/5' : 'border-white/20 hover:border-white/40'}`}>
                    <input type="radio" name="paymentMethod" value="bank" checked={formData.paymentMethod === 'bank'} onChange={handleInputChange} className="w-4 h-4 accent-accent mr-4" />
                    <div>
                      <div className="font-bold text-ivory">Direct Bank Transfer</div>
                      <div className="text-xs text-ivory/60 font-body">Make your payment directly into our bank account.</div>
                    </div>
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={items.length === 0}
                className="w-full h-16 bg-accent text-primary font-bold uppercase tracking-widest hover:bg-accent-light transition-all shadow-lg hover:shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Order
              </button>

            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:w-[40%] order-1 lg:order-2">
            <div className="bg-primary-light border border-white/10 p-6 lg:p-8 sticky top-32">
              <h2 className="text-xl font-heading text-ivory uppercase tracking-widest mb-6 border-b border-white/10 pb-3">Order Summary</h2>
              
              <div className="max-h-80 overflow-y-auto pr-2 space-y-4 mb-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {items.length === 0 ? (
                  <p className="text-ivory/60 font-body text-sm py-4">Your cart is empty.</p>
                ) : (
                  items.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="relative w-16 h-20 bg-primary flex-shrink-0 border border-white/5">
                        {item.imageUrl && <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />}
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-primary rounded-full text-[10px] flex items-center justify-center font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <div className="text-ivory text-sm font-bold uppercase tracking-wider line-clamp-1">{item.name}</div>
                        <div className="text-xs text-ivory/50 font-body uppercase">{item.color} / {item.size}</div>
                      </div>
                      <div className="text-accent font-bold text-sm">Rs. {(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-white/10 pt-6 space-y-4 text-sm font-body">
                <div className="flex justify-between text-ivory/70">
                  <span>Subtotal</span>
                  <span className="font-bold text-ivory">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-ivory/70">
                  <span className="flex items-center gap-2">Shipping <Truck size={14} className="text-accent" /></span>
                  <span className="font-bold text-ivory">{shippingCost === 0 ? 'Free' : `Rs. ${shippingCost}`}</span>
                </div>
                {shippingCost === 0 && formData.city !== "" && (
                   <div className="text-xs text-accent italic -mt-2">Free shipping to {formData.city}</div>
                )}
                
                <div className="border-t border-white/10 pt-4 flex justify-between items-center mt-2">
                  <span className="text-lg font-bold uppercase tracking-widest text-ivory">Total</span>
                  <span className="text-2xl font-bold text-accent">Rs. {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
