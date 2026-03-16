"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Heart, Eye } from "lucide-react";
import CartButton from "../buttons/CartButton";

const ProductCard = ({ product }) => {
  const {
    name,
    brand,
    price,
    discount,
    images,
    ratings,
    reviews,
    badges,
    _id,
  } = product;

  // Calculate price after discount
  const finalPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : product.price;
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card group relative flex flex-col overflow-hidden bg-base-100 p-3 transition-all hover:shadow-card border-transparent hover:border-primary/20"
    >
      {/* SEO: Structured Data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: name,
            image: images[0],
            brand: { "@type": "Brand", name: brand },
            offers: {
              "@type": "Offer",
              price: finalPrice,
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: ratings,
              reviewCount: reviews,
            },
          }),
        }}
      />

      {/* 1. Image & Overlay Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-base-200">
        {product.discount > 0 && (
          <div className="absolute top-4 left-4 z-10 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
            -{product.discount}% OFF
          </div>
        )}

        <img
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Inside ProductCard.jsx image container */}
        {product.isFeatured && (
          <div className="absolute top-4 right-4 z-10 bg-secondary text-secondary-content text-[9px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-tighter italic">
            <Star size={10} fill="currentColor" /> Best Seller
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            href={`/product/${product.slug}`}
            className="btn btn-circle btn-white shadow-xl hover:scale-110 transition-transform"
          >
            <Eye size={20} />
          </Link>
          <button className="btn btn-circle btn-primary shadow-xl hover:scale-110 transition-transform">
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] uppercase tracking-widest text-base-content/50 font-bold">
            {product.brand}
          </p>
          <div className="flex items-center gap-1 text-warning">
            <Star size={12} fill="currentColor" />
            <span className="text-[10px] font-bold text-base-content">4.8</span>
          </div>
        </div>

        <Link href={`/product/${product.slug}`}>
          <h3 className="font-bold text-base leading-tight hover:text-primary transition-colors cursor-pointer truncate">
            {product.name}
          </h3>
        </Link>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-xl font-mono font-bold text-primary">
            ${finalPrice}
          </span>
          {product.discount > 0 && (
            <span className="text-sm line-through opacity-30 font-mono">
              ${product.price}
            </span>
          )}
        </div>

        {/* Tags Logic */}
        <div className="mt-4 flex flex-wrap gap-1">
          {product.concerns?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[9px] bg-base-200 px-2 py-0.5 rounded-md uppercase font-bold opacity-60"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;
