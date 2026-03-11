import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-light border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <h2 className="font-heading text-2xl tracking-wider uppercase font-bold text-ivory">
                Fashion Vault
              </h2>
            </Link>
            <p className="text-ivory/70 text-sm leading-relaxed mb-6 font-body">
              Unlock Your Style with Pakistan&apos;s premier luxury fashion destination. Discover exclusive clothing, bags, perfumes, and accessories curated for the modern taste.
            </p>
            <div className="flex space-x-4 text-ivory/80">
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Youtube size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="font-heading text-lg tracking-wider uppercase text-ivory mb-6">
              Shop
            </h3>
            <ul className="space-y-4 text-sm text-ivory/70 font-body">
              <li>
                <Link href="/category/men" className="hover:text-accent transition-colors">Men&apos;s Collection</Link>
              </li>
              <li>
                <Link href="/category/women" className="hover:text-accent transition-colors">Women&apos;s Collection</Link>
              </li>
              <li>
                <Link href="/category/accessories" className="hover:text-accent transition-colors">Luxury Accessories</Link>
              </li>
              <li>
                <Link href="/category/perfumes" className="hover:text-accent transition-colors">Exclusive Perfumes</Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="hover:text-accent transition-colors text-accent-light">New Arrivals</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-heading text-lg tracking-wider uppercase text-ivory mb-6">
              Customer Care
            </h3>
            <ul className="space-y-4 text-sm text-ivory/70 font-body">
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent transition-colors">FAQs</Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-accent transition-colors">Shipping & Delivery</Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-accent transition-colors">Returns & Refunds</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-heading text-lg tracking-wider uppercase text-ivory mb-6">
              Stay Connected
            </h3>
            <ul className="space-y-4 text-sm text-ivory/70 font-body mb-8">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span>F-7 Markaz, Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent shrink-0" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent shrink-0" />
                <span>contact@fashionvault.pk</span>
              </li>
            </ul>

            <div>
              <p className="text-xs text-ivory/60 mb-3 uppercase tracking-wider">Subscribe to our newsletter</p>
              <form className="flex border-b border-white/20 pb-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent flex-grow text-sm text-ivory focus:outline-none placeholder:text-ivory/30"
                  required
                />
                <button
                  type="submit"
                  className="text-accent text-sm font-bold uppercase tracking-wider hover:text-accent-light transition-colors px-2"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ivory/50 font-body">
            &copy; {new Date().getFullYear()} Fashion Vault. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Payment Method Indicators */}
            <span className="text-xs text-ivory/50 font-body border border-white/10 px-2 py-1 rounded">COD</span>
            <span className="text-xs text-ivory/50 font-body border border-white/10 px-2 py-1 rounded">Visa / Mastercard</span>
            <span className="text-xs text-ivory/50 font-body border border-white/10 px-2 py-1 rounded">EasyPaisa</span>
            <span className="text-xs text-ivory/50 font-body border border-white/10 px-2 py-1 rounded">JazzCash</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
