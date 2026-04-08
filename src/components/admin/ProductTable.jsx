"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Eye,
  Trash2,
  Search,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  MoreVertical,
  Edit3,
} from "lucide-react";
import {
  deleteProduct,
  updateStock,
  toggleFeatured,
} from "@/lib/actions/product.actions";
import toast from "react-hot-toast";

const ProductTable = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleStockChange = async (id, currentStock, amount) => {
    const newStock = Math.max(0, currentStock + amount);
    const res = await updateStock(id, newStock);
    if (!res.success) toast.error("Failed to update stock");
  };

  const handleToggleFeatured = async (id, status) => {
    const res = await toggleFeatured(id, status);
    if (res.success) toast.success("Status updated");
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* 1. Header Stats (E-commerce Analytics) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="glass-card p-4 flex items-center gap-4 border-l-4 border-primary">
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <Package size={24} />
          </div>
          <div>
            <p className="text-xs opacity-50 uppercase font-bold">Total SKUs</p>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>
        </div>

        <div className="glass-card p-4 flex items-center gap-4 border-l-4 border-warning">
          <div className="p-3 bg-warning/10 rounded-xl text-warning">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-xs opacity-50 uppercase font-bold">Low Stock</p>
            <p className="text-2xl font-bold">
              {products.filter((p) => p.stock < 10).length}
            </p>
          </div>
        </div>


        <div className="glass-card p-4 flex items-center gap-4 border-l-4 border-secondary">
          <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs opacity-50 uppercase font-bold">
              Featured Items
            </p>
            <p className="text-2xl font-bold">
              {products.filter((p) => p.isFeatured).length}
            </p>
          </div>
        </div>
        
      </div>

      {/* 2. Advanced Search */}
      <div className="relative max-w-md">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
          size={18}
        />
        <input
          type="text"
          placeholder="Search inventory..."
          className="input input-bordered w-full pl-12 rounded-2xl bg-base-100 shadow-inner"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 3. Professional Table */}
      <div className="glass-card overflow-hidden border border-base-300 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200/50">
              <tr className="text-[10px] uppercase tracking-[0.15em] opacity-60">
                <th className="py-5">Product Details</th>
                <th>Pricing</th>
                <th>Inventory Management</th>
                <th>Visibility</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-base-200 transition-colors border-b border-base-200/50"
                >
                  {/* Product Info */}
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-base-300 border border-base-300 flex-shrink-0">
                        <Image
                          src={product.images?.[0] || "/placeholder.png"}
                          alt={product.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-sm leading-tight">
                          {product.name}
                        </div>
                        <div className="flex gap-2 mt-1">
                          <div className="text-[10px] opacity-40 uppercase font-mono">
                            {product.category}
                          </div>
                          {/* INDICATOR: Shows if product has a routine */}
                          {product.usageSteps?.length > 0 && (
                            <span className="badge badge-xs badge-outline badge-accent opacity-70 text-[8px]">
                              Routine Set
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Pricing with Discount Badge */}
                  <td>
                    <div className="font-bold text-primary">
                      ${product.price}
                    </div>
                    {product.discount > 0 && (
                      <span className="badge badge-success badge-outline border-none text-[9px] h-4 font-bold p-0">
                        -{product.discount}%
                      </span>
                    )}
                  </td>

                  {/* Inline Stock Editing */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${product.stock < 10 ? "bg-error animate-pulse" : "bg-success"}`}
                      ></div>
                      <div className="flex items-center bg-base-200 rounded-lg p-1 border border-base-300">
                        <button
                          onClick={() =>
                            handleStockChange(product._id, product.stock, -1)
                          }
                          className="px-2 hover:text-primary"
                        >
                          -
                        </button>
                        <span className="px-3 font-mono text-xs font-bold w-10 text-center">
                          {product.stock}
                        </span>
                        <button
                          onClick={() =>
                            handleStockChange(product._id, product.stock, 1)
                          }
                          className="px-2 hover:text-primary"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {product.stock < 10 && (
                      <p className="text-[9px] text-error font-bold mt-1 uppercase">
                        Restock Soon
                      </p>
                    )}
                  </td>

                  {/* Featured Toggle (Marketing) */}
                  <td>
                    <button
                      onClick={() =>
                        handleToggleFeatured(product._id, product.isFeatured)
                      }
                      className={`btn btn-xs rounded-full gap-1 border-none ${product.isFeatured ? "bg-secondary/10 text-secondary" : "bg-base-200 opacity-50"}`}
                    >
                      {product.isFeatured ? <CheckCircle2 size={12} /> : null}
                      {product.isFeatured ? "Featured" : "Standard"}
                    </button>
                  </td>

                  {/* Professional Actions Menu */}
                  <td className="text-right">
                    <div className="dropdown dropdown-left">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-sm btn-square"
                      >
                        <MoreVertical size={18} />
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 border border-base-200 rounded-2xl w-40"
                      >
                        <li>
                          <a className="text-xs font-semibold">
                            <Eye size={14} /> View Live
                          </a>
                        </li>
                        <li>
                          <a className="text-xs font-semibold">
                            <Edit3 size={14} /> Edit Content
                          </a>
                        </li>
                        <div className="divider my-1"></div>
                        <li>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="text-xs font-bold text-error"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
