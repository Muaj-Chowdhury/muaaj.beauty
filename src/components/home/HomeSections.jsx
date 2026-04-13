import Link from 'next/link';

  // name: Display label, slug: The value matching your DB, image: icon path
const categories = [
  { name: 'Skincare', slug: 'Skincare', image: '/skincare.svg' },
  { name: 'Haircare', slug: 'Haircare', image: '/haircare.svg' },
  { name: 'Cosmetics', slug: 'Cosmetics', image: '/cosmetics.svg' },
];

const concerns = [
  { title: 'The Acne Edit', slug: 'Acne', bg: 'bg-[#E8F3EE]' }, 
  { title: 'The Glow Guide', slug: 'Brightening', bg: 'bg-[#FCF3E8]' }, 
];

export default function HomeSections() {
  return (
    <div className="space-y-24 py-20 max-w-7xl mx-auto px-6">
      
      {/* 1. Shop by Category (Path: /shop/category/[slug]) */}
      <section>
        <h2 className="text-3xl font-bold italic mb-10 text-center">Shop by Category</h2>
        <div className="flex justify-center gap-12 flex-wrap">
          {categories.map((cat) => (
            <Link 
              href={`/shop/category/${cat.slug.toLowerCase()}`} 
              key={cat.slug} 
              className="group text-center"
            >
              <div className="w-28 h-28 rounded-full border-2 border-primary/10 overflow-hidden group-hover:border-primary group-hover:scale-105 transition-all p-2 bg-white shadow-sm">
                <img src={cat.image} className="w-full h-full object-cover rounded-full" alt={cat.name} />
              </div>
              <p className="mt-4 font-bold text-sm tracking-widest uppercase opacity-70 group-hover:opacity-100">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 2. Shop by Concern (Path: /shop/concern/[slug]) */}
      <section>
        <h2 className="text-3xl font-bold italic mb-10 text-center">Shop by Concern</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {concerns.map((con) => (
            <Link 
              href={`/shop/concern/${con.slug.toLowerCase()}`} 
              key={con.slug} 
              className="group"
            >
              <div className={`${con.bg} h-72 rounded-[3rem] flex flex-col items-center justify-center border border-black/5 group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors" />
                <h3 className="text-4xl font-serif italic text-primary relative z-10">{con.title}</h3>
                <span className="mt-4 text-xs font-bold uppercase tracking-[0.3em] opacity-40 relative z-10">
                   Explore Collection
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}