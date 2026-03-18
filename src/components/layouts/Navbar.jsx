'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, Menu, X, Search, ChevronDown,
  LayoutDashboard, History, LogOut, PlusCircle, Settings 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import NavLink from '../buttons/NavLink';


const Navbar = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const navRef = useRef(null);

  const isLoggedIn = status === "authenticated";
  const user = session?.user;
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    // Entrance Animation
    gsap.from(navRef.current, { y: -100, opacity: 0, duration: 1.2, ease: "power4.out" });

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainLinks = [
  { name: 'Home', href: '/' },
  { 
    name: 'Shop', 
    href: '/shop',
    hasDropdown: true,
    categories: [
      { name: 'Skincare', href: '/shop/category/skincare' },
      { name: 'Cosmetics', href: '/shop/category/cosmetics' },
      { name: 'Haircare', href: '/shop/category/haircare' },
    ],
    concerns: [
      { name: 'Acne', href: '/shop/concern/acne' },
      { name: 'Brightening', href: '/shop/concern/brightening' },
    ]
  },
];

  return (
    <nav ref={navRef} className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'py-2' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`glass-card flex items-center justify-between px-6 py-2 transition-all duration-500 border border-white/10 ${
          isScrolled ? 'shadow-2xl bg-base-100/80 backdrop-blur-lg border-primary/20' : 'bg-transparent border-transparent'
        }`}>
          
          {/* LEFT: LOGO & DESKTOP NAV */}
          <div className="flex items-center gap-10">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              <span className="text-primary italic">MUAAJ</span>
              <span className="text-base-content font-light italic">.beauty</span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {mainLinks.map((link) => (
                <div key={link.name} className="group relative py-4">
                  <NavLink href={link.href} className="flex items-center gap-1">
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                  </NavLink>

                  {link.hasDropdown && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                      <div className="glass-card bg-base-100 p-8 shadow-2xl border border-base-200 w-[450px] grid grid-cols-2 gap-8 rounded-3xl">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-4">By Category</p>
                          <ul className="space-y-3 text-sm">
                            {link.categories.map(cat => <li key={cat.name}><Link href={cat.href} classjName="hover:text-primary transition-colors">{cat.name}</Link></li>)}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-4">By Concern</p>
                          <ul className="space-y-3 text-sm">
                            {link.concerns.map(con => <li key={con.name}><Link href={con.href} className="hover:text-primary transition-colors">{con.name}</Link></li>)}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: SEARCH, AUTH, CART */}
          <div className="flex items-center gap-4">
            <button className="btn btn-ghost btn-circle btn-sm hidden md:flex"><Search size={18} /></button>

            {!isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link href="/login" className="text-sm font-semibold hover:text-primary transition-colors">Login</Link>
                <Link href="/register" className="btn btn-primary btn-sm rounded-full px-6 shadow-lg shadow-primary/20 border-none">Register</Link>
              </div>
            ) : (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-primary/20 hover:border-primary transition-all p-0.5">
                  <div className="w-9 rounded-full">
                    <img src={user?.image || "/avatar-placeholder.png"} alt="User" />
                  </div>
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] mt-4 p-2 shadow-2xl bg-base-100 border border-base-300 rounded-2xl w-64 backdrop-blur-xl">
                  <li className="px-4 py-3 border-b border-base-200 mb-2">
                    <p className="font-bold text-sm text-primary">{user?.name}</p>
                    <p className="text-[10px] text-base-content/50 truncate uppercase">{user?.email}</p>
                  </li>
                  <li><Link href="/dashboard" className="flex items-center gap-3 p-3 hover:bg-base-200 rounded-xl text-sm"><LayoutDashboard size={16} className="text-primary"/> Dashboard</Link></li>
                  <li><Link href="/orders" className="flex items-center gap-3 p-3 hover:bg-base-200 rounded-xl text-sm"><History size={16} className="text-primary"/> Order History</Link></li>

                  {/* {isAdmin && ( */}
                    <>
                      <div className="divider opacity-30 my-1 italic text-[9px] uppercase tracking-[0.2em] font-bold">Manager Vault</div>
                      <li><Link href="/add-product" className="flex items-center gap-3 p-3 hover:bg-primary/5 text-primary rounded-xl text-sm font-bold"><PlusCircle size={16}/> Add Product</Link></li>
                      <li><Link href="/manage-products" className="flex items-center gap-3 p-3 hover:bg-primary/5 text-primary rounded-xl text-sm font-bold"><Settings size={16}/> Manage Products</Link></li>
                    </>
                  {/* )} */}
                  <div className="divider opacity-30 my-1"></div>
                  <li><button onClick={() => signOut({ callbackUrl: '/' })} className="flex w-full items-center gap-3 p-3 text-error hover:bg-error/5 rounded-xl text-sm font-semibold"><LogOut size={16}/> Logout</button></li>
                </ul>
              </div>
            )}

            <Link href="/cart" className="btn btn-primary btn-sm rounded-full gap-2 shadow-lg shadow-primary/20 border-none">
              <ShoppingBag size={18} />
              <span className="bg-white/20 px-1.5 py-0.5 rounded-md text-[10px]">0</span>
            </Link>

            <button className="lg:hidden btn btn-ghost btn-circle btn-sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            className="absolute top-full left-0 w-full px-6 py-2 lg:hidden"
          >
            <div className="glass-card p-6 flex flex-col gap-2 shadow-2xl bg-base-100/95 backdrop-blur-2xl border-primary/10 rounded-3xl">
              {mainLinks.map((link) => (
                <div key={link.name} className="border-b border-base-200 last:border-0">
                  {link.hasDropdown ? (
                    <div className="py-3">
                      <button 
                        onClick={() => setMobileShopOpen(!mobileShopOpen)}
                        className="flex items-center justify-between w-full text-lg font-medium"
                      >
                        {link.name} <ChevronDown size={18} className={mobileShopOpen ? 'rotate-180 transition-transform' : ''} />
                      </button>
                      <AnimatePresence>
                        {mobileShopOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="overflow-hidden pl-4 mt-2 space-y-3">
                             <p className="text-[10px] uppercase font-bold text-primary pt-2">Categories</p>
                             {link.categories.map(c => <Link key={c.name} href={c.href} onClick={() => setIsOpen(false)} className="block text-sm opacity-70">{c.name}</Link>)}
                             <p className="text-[10px] uppercase font-bold text-primary pt-2">Concerns</p>
                             {link.concerns.map(c => <Link key={c.name} href={c.href} onClick={() => setIsOpen(false)} className="block text-sm opacity-70">{c.name}</Link>)}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link href={link.href} onClick={() => setIsOpen(false)} className="block py-3 text-lg font-medium">{link.name}</Link>
                  )}
                </div>
              ))}
              {!isLoggedIn && (
                <div className="flex flex-col gap-3 pt-4">
                  <Link href="/login" onClick={() => setIsOpen(false)} className="btn btn-outline border-primary/20 rounded-full">Login</Link>
                  <Link href="/register" onClick={() => setIsOpen(false)} className="btn btn-primary rounded-full border-none">Register</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;