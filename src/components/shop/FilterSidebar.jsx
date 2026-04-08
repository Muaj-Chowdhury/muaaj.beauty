'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const FilterSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Local state for Price Slider to make it feel smooth
  const [price, setPrice] = useState(searchParams.get('maxPrice') || 1000);

  const categories = ["Skincare", "Personal Care", "Haircare"];
  const concerns = ["Acne", "Brightening", "Anti-Aging", "Dryness"];

  const updateUrl = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="space-y-8 p-4 bg-base-100 rounded-3xl border border-base-200">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="checkbox checkbox-primary checkbox-sm"
                checked={searchParams.get('category') === cat}
                onChange={(e) => updateUrl('category', e.target.checked ? cat : null)}
              />
              <span className="text-sm group-hover:text-primary transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Max Price: ${price}</h3>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={price} 
          className="range range-primary range-xs" 
          onChange={(e) => setPrice(e.target.value)}
          onMouseUp={() => updateUrl('maxPrice', price)}
        />
        <div className="flex justify-between text-[10px] opacity-50 mt-2 font-bold">
          <span>$0</span>
          <span>$100+</span>
        </div>
      </div>

      {/* Concern Filter */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Shop by Concern</h3>
        <div className="flex flex-wrap gap-2">
          {concerns.map(con => (
            <button
              key={con}
              onClick={() => updateUrl('concern', searchParams.get('concern') === con ? null : con)}
              className={`btn btn-xs rounded-full ${searchParams.get('concern') === con ? 'btn-primary' : 'btn-outline opacity-50'}`}
            >
              {con}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={() => router.push('/shop')}
        className="btn btn-ghost btn-sm w-full text-xs opacity-50 underline"
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;