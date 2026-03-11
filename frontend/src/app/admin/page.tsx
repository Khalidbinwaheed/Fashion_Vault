"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, ShoppingBag, DollarSign, Package, Settings, LogOut, ArrowUpRight } from "lucide-react";

// Mock Stats
const stats = [
  { label: "Total Revenue", value: "Rs. 4.2M", icon: DollarSign, trend: "+12.5%" },
  { label: "Total Orders", value: "1,248", icon: ShoppingBag, trend: "+5.2%" },
  { label: "Active Users", value: "8,340", icon: Users, trend: "+18.1%" },
  { label: "Products", value: "342", icon: Package, trend: "+2" },
];

// Mock Recent Orders
const recentOrders = [
  { id: "#ORD-7392", customer: "Ayesha Khan", date: "Oct 24, 2024", total: "Rs. 12,500", status: "Processing" },
  { id: "#ORD-7391", customer: "Usman Ali", date: "Oct 24, 2024", total: "Rs. 8,200", status: "Shipped" },
  { id: "#ORD-7390", customer: "Zoya Malik", date: "Oct 23, 2024", total: "Rs. 24,000", status: "Delivered" },
  { id: "#ORD-7389", customer: "Bilal Ahmed", date: "Oct 23, 2024", total: "Rs. 5,400", status: "Processing" },
  { id: "#ORD-7388", customer: "Sara Tariq", date: "Oct 22, 2024", total: "Rs. 18,900", status: "Cancelled" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const sidebarLinks = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "products", label: "Products", icon: Package },
    { id: "customers", label: "Customers", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-heading font-bold uppercase tracking-widest text-ivory mb-6">Overview</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-primary-light border border-white/5 p-6 hover:border-accent/40 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                     <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                       <stat.icon size={20} />
                     </div>
                     <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                       <ArrowUpRight size={14} /> {stat.trend}
                     </span>
                  </div>
                  <div>
                    <h3 className="text-sm text-ivory/60 uppercase tracking-widest mb-1">{stat.label}</h3>
                    <p className="text-2xl font-bold font-heading text-ivory">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders Table */}
            <div className="bg-primary-light border border-white/5 rounded-sm overflow-hidden mt-8">
               <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                 <h3 className="font-heading font-bold uppercase tracking-widest text-ivory">Recent Orders</h3>
                 <button className="text-xs text-accent hover:text-white transition-colors uppercase tracking-widest font-bold">View All</button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="border-b border-white/10 text-xs text-ivory/50 uppercase tracking-widest font-bold bg-primary/20">
                       <th className="p-4">Order ID</th>
                       <th className="p-4">Customer</th>
                       <th className="p-4">Date</th>
                       <th className="p-4">Total</th>
                       <th className="p-4 text-right">Status</th>
                     </tr>
                   </thead>
                   <tbody className="text-sm font-body text-ivory/80">
                     {recentOrders.map((order, idx) => (
                       <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                         <td className="p-4 font-bold">{order.id}</td>
                         <td className="p-4">{order.customer}</td>
                         <td className="p-4 text-ivory/50">{order.date}</td>
                         <td className="p-4">{order.total}</td>
                         <td className="p-4 text-right">
                           <span className={`inline-block px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full ${
                             order.status === 'Delivered' || order.status === 'Shipped' ? 'bg-emerald-500/20 text-emerald-400' :
                             order.status === 'Processing' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' :
                             'bg-red-500/20 text-red-500'
                           }`}>
                             {order.status}
                           </span>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center border border-dashed border-white/20 bg-primary-light/50">
            <LayoutDashboard size={48} className="text-ivory/20 mb-4" />
            <h2 className="text-xl font-heading uppercase tracking-widest text-ivory/60 mb-2">{activeTab} Modudle</h2>
            <p className="text-sm text-ivory/40 font-body max-w-sm">This section is currently under development. Please check back later.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-primary">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-primary-light hidden md:flex flex-col z-10 relative">
         <div className="h-[88px] flex items-center justify-center border-b border-white/10 shrink-0">
           <Link href="/" className="font-heading text-xl uppercase tracking-widest font-bold text-accent">Fashion Vault</Link>
         </div>
         <div className="p-6 flex-grow space-y-2">
            <div className="text-[10px] text-ivory/40 uppercase tracking-widest font-bold mb-4 pl-4">Admin Dashboard</div>
            {sidebarLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-widest transition-all rounded-sm ${activeTab === link.id ? 'bg-accent text-primary' : 'text-ivory/60 hover:bg-white/5 hover:text-ivory'}`}
              >
                <link.icon size={18} />
                {link.label}
              </button>
            ))}
         </div>
         <div className="p-6 border-t border-white/10">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-widest text-red-400 hover:bg-red-500/10 rounded-sm transition-all">
               <LogOut size={18} />
               Sign Out
            </button>
         </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-h-screen relative">
         {/* Mobile Header (Only visible on small screens) */}
         <div className="md:hidden h-16 border-b border-white/10 bg-primary-light flex items-center justify-between px-6">
            <span className="font-heading font-bold uppercase tracking-widest text-accent">FV Admin</span>
            <button className="text-ivory/60 hover:text-ivory"><LayoutDashboard size={24} /></button>
         </div>
         
         {/* Page Content */}
         <div className="p-6 md:p-10 flex-grow">
           {renderContent()}
         </div>
      </main>

    </div>
  );
}
