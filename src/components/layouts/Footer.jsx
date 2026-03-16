import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Send } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-primary/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="text-3xl font-bold italic tracking-tighter text-primary">
              MUAAJ<span className="text-secondary">.beauty</span>
            </Link>
            <p className="text-base-content/60 max-w-sm leading-relaxed">
              Curating the finest rituals for your skin. We believe beauty is a journey of self-care, 
              science, and soul. Join our community for a radiant life.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-primary/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold italic">Join the Inner Circle</h3>
                <p className="text-sm opacity-50">Get 10% off your first ritual and early access.</p>
              </div>
              <div className="relative w-full md:w-auto min-w-[300px]">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="input w-full rounded-full bg-white border-none pr-12 focus:ring-2 focus:ring-primary/20"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:scale-105 transition-transform">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-12 border-y border-primary/5">
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Shop</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link href="/shop/category/skincare" className="hover:text-primary transition-colors">Skincare</Link></li>
              <li><Link href="/shop/category/haircare" className="hover:text-primary transition-colors">Haircare</Link></li>
              <li><Link href="/shop/category/personal-care" className="hover:text-primary transition-colors">Personal Care</Link></li>
              <li><Link href="/shop/concern/acne" className="hover:text-primary transition-colors">Acne Edit</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Company</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/sustainability" className="hover:text-primary transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Support</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-primary transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Contact</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li className="flex items-center gap-3"><MapPin size={16} /> Dhaka, Bangladesh</li>
              <li className="flex items-center gap-3"><Phone size={16} /> +880 1234 567890</li>
              <li className="flex items-center gap-3"><Mail size={16} /> hello@muaaj.beauty</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Legal */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest font-bold opacity-30">
          <p>© {currentYear} MUAAJ.BEAUTY. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;