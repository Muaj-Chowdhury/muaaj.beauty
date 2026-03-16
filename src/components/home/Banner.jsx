'use client';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sparkles, MoveRight } from 'lucide-react';
import gsap from 'gsap';
import Link from 'next/link';

const HomeBanner = () => {
  const bannerRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const decorativeRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Reset initial states for entrance
    gsap.set([headlineRef.current, subRef.current, ctaRef.current], { opacity: 0, y: 30 });
    gsap.set(decorativeRef.current, { opacity: 0, scale: 0.8 });

    tl.to(bannerRef.current, {
      paddingTop: '8rem',
      duration: 1.5,
      ease: 'power4.out',
    })
      .to(headlineRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.4')
      .to(decorativeRef.current, { 
          opacity: 0.1, 
          scale: 1, 
          duration: 1.5, 
          ease: 'expo.out' 
      }, '-=1');
  }, []);

  return (
    // CHANGE 1: Use <section> instead of <div>
    <section 
      ref={bannerRef}
      className="relative w-full bg-base-100 overflow-hidden py-24 md:py-32"
      aria-labelledby="banner-heading"
    >
      <div 
        ref={decorativeRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full  pointer-events-none"
        style={{
            backgroundImage: 'var(--gradient-accent)',
            opacity: 0
        }}
      />

      <div className="section-container relative z-10 flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
  
  {/* Left Side: Content */}
  <div className="flex-1 flex flex-col items-center lg:items-start">
    <div className="flex items-center gap-2 mb-6">
      <Leaf className="w-5 h-5 text-primary" aria-hidden="true" />
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-base-content/60">
        Botanical Logic | Clinical Precision
      </p>
    </div>

    <h1 id="banner-heading" ref={headlineRef} className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-[-0.04em] mb-8">
      Elevate Your Natural <br />
      <span className="text-gradient font-medium italic">Glow.</span>
    </h1>

    <p ref={subRef} className="max-w-xl mb-12 text-base md:text-lg text-base-content/80 leading-relaxed text-balance">
      Curated skincare where luxury formulations meet conscious, earth-first ingredients.
    </p>

    <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
      <Link href="/shop" className="btn btn-primary rounded-full px-12 group gap-2 shadow-sm">
        Shop New Arrivals
        <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </div>

  {/* Right Side: The Image (NEW OPTION) */}
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay: 0.5 }}
    className="flex-1 relative w-full aspect-square max-w-[700px]"
  >
    <div className="relative w-full h-full overflow-hidden p-4">
       <Image 
         src="/AuraCore-1024x684-removebg-preview.png" // Put your image in public/hero-product.png
         alt="Premium Hydrating Serum for Natural Glow" 
         fill
         priority // CRITICAL FOR SEO: Tells Next.js to load this first
         className="object-cover rounded-xl"
         sizes="(max-width: 768px) 100vw, 50vw"
       />
    </div>
  </motion.div>
</div>
    </section>
  );
};

export default HomeBanner;