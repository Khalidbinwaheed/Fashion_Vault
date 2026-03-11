"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Package, Heart, MapPin, LogOut } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { trendingProducts } from "@/data/mockProducts";

// Mock user data
const user = {
  name: "Ayesha Khan",
  email: "ayesha.khan@example.com",
  joined: "October 2024",
  tier: "Gold Member",
};

// Mock orders
const orders = [
  { id: "FV-PK-892104", date: "Oct 12, 2024", total: 12500, status: "Delivered", items: 2 },
  { id: "FV-PK-914238", date: "Nov 05, 2024", total: 4200, status: "Processing", items: 1 },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-heading text-ivory uppercase tracking-widest mb-6">Welcome Back, {user.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary-light border border-white/10 p-6 flex flex-col items-center justify-center text-center gap-2 hover:border-accent/50 transition-colors">
                 <Package size={32} className="text-accent mb-2" />
                 <span className="text-2xl font-bold text-ivory uppercase tracking-widest">2</span>
                 <span className="text-xs text-ivory/60 font-body uppercase tracking-wider">Total Orders</span>
              </div>
              <div className="bg-primary-light border border-white/10 p-6 flex flex-col items-center justify-center text-center gap-2 hover:border-accent/50 transition-colors">
                 <Heart size={32} className="text-accent mb-2" />
                 <span className="text-2xl font-bold text-ivory uppercase tracking-widest">5</span>
                 <span className="text-xs text-ivory/60 font-body uppercase tracking-wider">Wishlisted Items</span>
              </div>
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-primary-light border border-[#D4AF37]/50 p-6 flex flex-col items-center justify-center text-center gap-2 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37]/20 rounded-bl-full"></div>
                 <User size={32} className="text-[#D4AF37] mb-2 z-10" />
                 <span className="text-lg font-bold text-[#D4AF37] uppercase tracking-widest z-10">{user.tier}</span>
                 <span className="text-xs text-ivory/80 font-body z-10">Enjoy exclusive perks</span>
              </div>
            </div>
          </div>
        );
      case "orders":
        return (
          <div>
            <h2 className="text-2xl font-heading text-ivory uppercase tracking-widest mb-6">Order History</h2>
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="border border-white/10 p-6 bg-primary-light flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-ivory font-bold uppercase tracking-wider">{order.id}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 ${order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-accent/20 text-accent'}`}>{order.status}</span>
                    </div>
                    <div className="text-xs text-ivory/60 font-body">Placed on {order.date} • {order.items} items</div>
                  </div>
                  <div className="flex items-center justify-between md:flex-col md:items-end gap-2 text-sm">
                    <span className="text-accent font-bold">Rs. {order.total.toLocaleString()}</span>
                    <button className="text-ivory hover:text-accent uppercase tracking-widest text-[10px] font-bold border-b border-ivory hover:border-accent transition-all pb-1">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "wishlist":
        return (
          <div>
            <h2 className="text-2xl font-heading text-ivory uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Your Wishlist</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {trendingProducts.slice(0,3).map(product => (
                 <ProductCard key={product.id} {...product} />
               ))}
            </div>
          </div>
        );
      case "addresses":
        return (
          <div>
            <h2 className="text-2xl font-heading text-ivory uppercase tracking-widest mb-6">Saved Addresses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-accent p-6 bg-accent/5 relative">
                 <span className="absolute top-4 right-4 text-[10px] bg-accent text-primary px-2 py-1 uppercase tracking-widest font-bold">Default</span>
                 <h3 className="font-bold text-ivory uppercase tracking-wider mb-2">{user.name}</h3>
                 <p className="text-sm font-body text-ivory/70 leading-relaxed max-w-[200px]">
                   House 45, Street 12, F-8/3<br />
                   Islamabad, 44000<br />
                   Pakistan<br />
                   Phone: +92 300 1234567
                 </p>
                 <div className="mt-6 flex gap-4 text-xs font-bold tracking-widest uppercase">
                    <button className="text-accent hover:text-white transition-colors">Edit</button>
                    <button className="text-red-400 hover:text-white transition-colors">Delete</button>
                 </div>
              </div>
              <button className="border border-dashed border-white/20 p-6 flex flex-col items-center justify-center text-ivory/50 hover:text-accent hover:border-accent transition-colors min-h-[200px] gap-3">
                 <MapPin size={32} />
                 <span className="uppercase tracking-widest font-bold text-sm">Add New Address</span>
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: "dashboard", icon: User, label: "Dashboard" },
    { id: "orders", icon: Package, label: "Orders" },
    { id: "wishlist", icon: Heart, label: "Wishlist" },
    { id: "addresses", icon: MapPin, label: "Addresses" },
  ];

  return (
    <div className="bg-primary min-h-screen">
      
      {/* Page Header */}
      <div className="bg-primary-light border-b border-white/5 pt-12 pb-8">
        <div className="container mx-auto px-6 md:px-12">
          <h1 className="text-3xl md:text-4xl font-heading text-ivory font-bold uppercase tracking-widest mb-2">My Account</h1>
          <p className="text-sm text-ivory/60 font-body">Manage your profile, orders, and preferences.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="md:w-64 shrink-0">
             <div className="sticky top-32 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-accent/10 border-l-2 border-accent text-accent' : 'text-ivory/70 hover:bg-white/5 hover:text-ivory border-l-2 border-transparent'}`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
                <button
                  className="w-full flex items-center gap-3 px-4 py-4 text-sm font-bold uppercase tracking-widest text-red-400 hover:bg-red-400/10 border-l-2 border-transparent transition-all mt-8"
                >
                  <LogOut size={18} />
                  Logout
                </button>
             </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            {renderContent()}
          </div>
          
        </div>
      </div>
    </div>
  );
}
