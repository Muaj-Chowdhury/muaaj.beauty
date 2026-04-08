import { getFilteredProducts } from "@/lib/actions/product.actions";
import FilterSidebar from "@/components/shop/FilterSidebar";
import SortDropdown from "@/components/shop/SortDropdown";

import { Suspense } from "react";
import ProductCard from "@/components/cards/ProductCard";

export default async function ShopPage({ params, searchParams }) {
  // 1. Extract info from the URL path: /shop/[type]/[value]
  const pathParams = await params;
  const filterArray = pathParams.filter || []; // e.g., ["category", "skincare"]

  const filterType = filterArray[0]; // "category" or "concern"
  const filterValue = filterArray[1]; // "skincare" or "acne"

  // 2. Combine Path Params with Search Params (for sorting/price)
  const queryParams = await searchParams;
  const combinedParams = {
    ...queryParams,
    [filterType]: filterValue, // Silently injects 'category: skincare' into our logic
  };

  const products = await getFilteredProducts(combinedParams);

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      {/* Header Banner */}
      <div className="h-48 bg-primary/5 flex items-center justify-center border-b border-primary/10 pt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold italic tracking-tighter">
            The Beauty Gallery
          </h1>
          <p className="text-xs uppercase tracking-[0.3em] opacity-50 mt-2">
            Curated for your specific skin ritual
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar (Filter Logic) */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="sticky top-28">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold italic tracking-tighter capitalize">
                {/* 1. Check if BOTH exist in the URL object */}
                {combinedParams.category &&
                (combinedParams.concern )
                  ? `${combinedParams.category} for ${combinedParams.concern}`
                  : /* 2. Fallback to whichever one is available, or "All Rituals" */
                    combinedParams.category ||
                    combinedParams.concern ||
                    combinedParams.concerns ||
                    "All Rituals"}

                <span className="ml-3 text-xs opacity-40 font-normal italic lowercase tracking-normal">
                  ({products.length} items found)
                </span>
              </h1>
              <SortDropdown />
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="h-96 flex flex-col items-center justify-center border-2 border-dashed border-base-200 rounded-[3rem]">
                <p className="text-xl italic opacity-30">
                  No products match your current filters.
                </p>
                <button className="btn btn-link btn-primary no-underline mt-2">
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
