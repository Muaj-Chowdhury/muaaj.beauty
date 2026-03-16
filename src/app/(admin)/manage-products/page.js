import { getCollection } from "@/lib/mongodb";
import ProductTable from "@/components/admin/ProductTable";

export default async function ManageProductsPage() {
  const collection = await getCollection("products");
  const products = await collection.find({}).sort({ createdAt: -1 }).toArray();

  // Convert MongoDB _id to string for the Client Component
  const serializedProducts = products.map(p => ({
    ...p,
    _id: p._id.toString(),
  }));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-primary italic">Manage Inventory</h1>
          <p className="text-base-content/60 mt-2">Update, view, or remove items from MUAAJ.beauty</p>
        </div>
        <div className="badge badge-primary badge-outline p-4 font-mono">
          Total Products: {products.length}
        </div>
      </div>

      <ProductTable products={serializedProducts} />
    </div>
  );
}