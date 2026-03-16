"use server";

import { ObjectId } from "mongodb";
import { getCollection } from "../mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { slugify } from "../utils";

export async function getAllProducts() {
    try{
        const productCollection = await getCollection("products");
        // Fetch and sort by newest
        const products = await productCollection.find({}).sort({ createdAt: -1 }).toArray();
        // Convert MongoDB ObjectIDs to Strings for Next.js compatibility
        return products.map(product => ({
            ...product,
            _id: product._id.toString()
        }))
    }
    catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}
export async function getFilteredProducts(params) {
  try {
    const collection = await getCollection("products");
    let query = {};

    // 1. Dynamic Filtering Logic
    if (params.category) {
      query.category = { $regex: new RegExp(`^${params.category}$`, "i") };
    }
    
    if (params.concern) {
      // Matches the concern inside the concerns array (Case-Insensitive)
      query.concerns = { $in: [new RegExp(`^${params.concern}$`, "i")] };
    }

    if (params.minPrice || params.maxPrice) {
      query.price = {
        $gte: parseFloat(params.minPrice) || 0,
        $lte: parseFloat(params.maxPrice) || 10000
      };
    }

    // 2. Sorting Logic
    let sortOptions = { createdAt: -1 };
    if (params.sort === "price_asc") sortOptions = { price: 1 };
    if (params.sort === "price_desc") sortOptions = { price: -1 };
    if (params.sort === "popular") sortOptions = { ratings: -1 };

    const products = await collection.find(query).sort(sortOptions).toArray();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}
// export async function getProductById(id) {
//   try {
//     const productCollection = await getCollection("products");
    
//     // Convert string ID back to MongoDB ObjectId
//     const product = await productCollection.findOne({ _id: new ObjectId(id) });

//     if (!product) return null;

//     return JSON.parse(JSON.stringify(product));
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return null;
//   }
// }

export async function createProduct(productData) {
  try {
    // const session = await getServerSession(authOptions);
    
    // // Security Check
    // if (!session || session.user.role !== "admin") {
    //   return { success: false, message: "Unauthorized. Admin access required." };
    // }
    const collection = await getCollection("products");

    // 1. Generate a Unique Slug
    let generatedSlug = slugify(productData.name);
    const existingProduct = await collection.findOne({ slug: generatedSlug });
    if (existingProduct) {
      generatedSlug = `${generatedSlug}-${Math.floor(Math.random() * 1000)}`;
    }

    // 2. Prepare Reformed Data Object
    const newProduct = {
      // General Info
      name: productData.name.trim(),
      slug: generatedSlug,
      brand: productData.brand.trim(),
      category: productData.category,
      sku: productData.sku?.trim() || `SKU-${Date.now()}`,
      description: productData.description,
      
      // Inventory & Pricing (Ensuring Numbers)
      price: parseFloat(productData.price) || 0,
      discount: parseInt(productData.discount) || 0,
      stock: parseInt(productData.stock) || 0,
      
      // Beauty Attributes (Arrays from your state)
      ingredients: Array.isArray(productData.ingredients) ? productData.ingredients : [],
      skinType: Array.isArray(productData.skinType) ? productData.skinType : [],
      concerns: Array.isArray(productData.concerns) ? productData.concerns : [],
      images: Array.isArray(productData.images) ? productData.images : [],
      
      // Professional Fields (Added for future-proofing)
      usageSteps: productData.usageSteps || [], // For the "How to Use" routine
      ratings: 0,
      reviews: 0,
      isFeatured: productData.isFeatured === "true" || productData.isFeatured === true,
      
      // Metadata
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await collection.insertOne(newProduct);
    
    if (result.acknowledged) {
      // Revalidate all relevant paths
      revalidatePath("/shop");
      revalidatePath("/admin/manage-products");
      revalidatePath("/"); // Update home page "Featured" sections
      
      return { 
        success: true, 
        message: "Product published successfully!",
        slug: generatedSlug 
      };
    }

    return { success: false, message: "Failed to acknowledge database insertion." };

  } catch (error) {
    console.error("Add Product Error:", error);
    return { success: false, message: "Internal Server Error: " + error.message };
  }
}

export async function deleteProduct(productId) {
  try {
    const collection = await getCollection("products");
    const result = await collection.deleteOne({ _id: new ObjectId(productId) });
    
    if (result.deletedCount === 1) {
      revalidatePath("/admin/manage-products");
      return { success: true, message: "Product removed successfully." };
    }
    return { success: false, message: "Product not found." };
  } catch (error) {
    return { success: false, message: "Failed to delete product." };
  }
}
// Quick Stock Update
export async function updateStock(productId, newStock) {
  const collection = await getCollection("products");
  await collection.updateOne(
    { _id: new ObjectId(productId) },
    { $set: { stock: parseInt(newStock) } }
  );
  revalidatePath("/admin/manage-products");
  return { success: true };
}

// Toggle Featured Status
export async function toggleFeatured(productId, currentStatus) {
  const collection = await getCollection("products");
  await collection.updateOne(
    { _id: new ObjectId(productId) },
    { $set: { isFeatured: !currentStatus } }
  );
  revalidatePath("/admin/manage-products");
  return { success: true };
}