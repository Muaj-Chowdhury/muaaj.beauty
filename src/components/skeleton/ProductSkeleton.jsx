import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="glass-card flex flex-col p-3 animate-pulse bg-base-200/50">
      {/* Image Skeleton */}
      <div className="aspect-[4/5] w-full rounded-xl bg-base-300"></div>

      {/* Text Skeleton */}
      <div className="mt-4 px-2 space-y-3">
        <div className="h-3 w-1/4 bg-base-300 rounded"></div>
        <div className="h-5 w-3/4 bg-base-300 rounded"></div>
        <div className="h-3 w-1/2 bg-base-300 rounded"></div>
        
        <div className="mt-6 flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-3 w-10 bg-base-300 rounded"></div>
            <div className="h-6 w-16 bg-base-300 rounded"></div>
          </div>
          <div className="h-12 w-12 rounded-full bg-base-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;