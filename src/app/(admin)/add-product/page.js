import AddProductForm from "@/components/admin/AddProductForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add New Product | Admin Dashboard",
};

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  // Server-side protection
//   if (session?.user?.role !== "admin") {
//     redirect("/login");
//   }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-primary italic">Add New Product</h1>
        <p className="text-base-content/60 mt-2">Create a new luxury entry for MUAAJ.beauty</p>
      </div>
      <AddProductForm />
    </div>
  );
}