'use client';
import { useRouter, useSearchParams } from 'next/navigation';

const SortDropdown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <select 
      className="select select-bordered select-sm rounded-full bg-base-100 font-semibold text-xs"
      onChange={(e) => handleSort(e.target.value)}
      defaultValue={searchParams.get('sort') || ""}
    >
      <option value="">Sort By: Newest</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
      <option value="popular">Most Popular</option>
    </select>
  );
};

export default SortDropdown;