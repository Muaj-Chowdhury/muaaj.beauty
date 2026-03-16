import Banner from "@/components/home/Banner";
import HomeSections from "@/components/home/HomeSections";
import { getCollection } from "@/lib/mongodb";
import ProductCard from "@/components/cards/ProductCard";

export default async function Home() {
  // Fetching Best Sellers directly on the Home Page
  const collection = await getCollection("products");
  const bestSellers = await collection
    .find({ isFeatured: true })
    .limit(4)
    .toArray();

  return (
    <main className="min-h-screen bg-[#FDFCFB]">
      {/* 1. Hero Section */}
      <Banner />

      {/* 2. Category & Concern Sections */}
      <HomeSections />

      {/* 3. Dynamic Best Sellers Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold italic tracking-tighter text-primary">
                Best Sellers
              </h2>
              <p className="text-xs uppercase tracking-[0.2em] opacity-40 mt-2 font-bold">
                The community's most-loved rituals
              </p>
            </div>
            <a href="/shop" className="btn btn-link btn-primary no-underline italic font-bold">
              Explore the full collection →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <ProductCard 
                key={product._id} 
                product={JSON.parse(JSON.stringify(product))} 
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}