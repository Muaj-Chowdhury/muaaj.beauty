'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Star, CheckCircle2, ShieldCheck } from 'lucide-react';

const ProductDetails = ({ product }) => {
  const [activeImg, setActiveImg] = useState(product.images[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      {/* SECTION: Image Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-square rounded-3xl overflow-hidden glass-card border-none">
          <Image 
            src={activeImg} 
            alt={product.name} 
            fill 
            className="object-cover" 
            priority 
          />
        </div>
        <div className="flex gap-4">
          {product.images.map((img, i) => (
            <button 
              key={i} 
              onClick={() => setActiveImg(img)}
              className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImg === img ? 'border-primary' : 'border-transparent opacity-60'}`}
            >
              <Image src={img} alt="preview" fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* SECTION: Content */}
      <div className="flex flex-col">
        <span className="text-primary font-bold uppercase tracking-widest text-sm">{product.brand}</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 text-base-content">{product.name}</h1>
        
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={18} fill="currentColor" />
            <span className="text-base-content font-bold">{product.ratings}</span>
          </div>
          <span className="text-base-content/50 border-l pl-4">{product.reviews} verified reviews</span>
        </div>

        <p className="mt-8 text-lg text-base-content/70 leading-relaxed">
          {product.description}
        </p>

        {/* Ingredients & Skin Type Badges */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-sm uppercase mb-3">Key Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map(ing => (
                <span key={ing} className="badge badge-outline border-primary/30 text-xs py-3">{ing}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase mb-3">Skin Type</h3>
            <div className="flex flex-wrap gap-2">
              {product.skinType.map(type => (
                <span key={type} className="badge badge-ghost text-xs py-3">{type}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="divider my-10"></div>

        {/* Pricing & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-base-content/40 line-through">${product.price}</span>
            <div className="text-4xl font-bold">${(product.price - (product.price * product.discount / 100)).toFixed(2)}</div>
          </div>
          <button className="btn btn-primary btn-lg rounded-full px-12 gap-3 shadow-xl shadow-primary/20">
            <ShoppingBag size={20} />
            Add to Bag
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex gap-6 text-xs text-base-content/60 italic">
          <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-success"/> Cruelty Free</div>
          <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-success"/> Dermatologist Tested</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;