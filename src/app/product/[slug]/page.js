import { getProductById } from "@/lib/actions/product.actions";
import ProductDetails from "@/components/ProductDetails";
import { notFound } from "next/navigation";
import { getCollection } from "@/lib/mongodb";

// SEO: Dynamic Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params; // Must match [slug] folder name
  
  const collection = await getCollection("products");
  const product = await collection.findOne({ slug: slug });

  if (!product) {
    notFound(); // Redirects to 404 if slug is invalid
  }

  // Calculate price for SEO
  const salePrice = (product.price - (product.price * product.discount / 100)).toFixed(2);

  return {
    title: product.name, // Will become "Product Name | MUAAJ.beauty" due to template
    description: product.description.slice(0, 160), // Keep it under 160 chars for Google
    openGraph: {
      title: `${product.name} - ${product.brand}`,
      description: product.description,
      type: "article",
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    // Adding specific meta for Twitter/X
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }) {
     const { slug } = await params;
   console.log("--- REQUESTING SLUG:", slug); // <--- See if this shows up

   const collection = await getCollection("products");
   const product = await collection.findOne({ slug: slug });
   console.log("--- DB RESULT:", product);

  if (!product) {
    notFound(); // Redirects to 404 if slug is invalid
  }
  // Convert MongoDB object (with toJSON methods) into a plain JS object
const serializedProduct = JSON.parse(JSON.stringify(product))

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <ProductDetails product={serializedProduct} />
    </div>
  );
}