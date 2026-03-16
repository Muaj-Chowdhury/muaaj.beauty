import ProductSkeleton from '@/components/skeleton/ProductSkeleton';
import React from 'react';

const Loading = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Mirror the header height/spacing so the page doesn't "jump" */}
      <header className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl text-transparent bg-gray-200 animate-pulse rounded-md inline-block w-64">
          &nbsp;
        </h1>
        <p className="mt-4 bg-gray-200 animate-pulse rounded-md h-6 max-w-lg mx-auto">
          &nbsp;
        </p>

        {/* The Grid - Matches your Products grid exactly */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </header>
    </div>
  );
};

export default Loading;
