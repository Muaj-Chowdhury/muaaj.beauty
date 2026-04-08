"use client";
import React, { useState } from "react";
import Image from "next/image";
import { createProduct } from "@/lib/actions/product.actions";
import toast from "react-hot-toast";
import {
  Package,
  DollarSign,
  Tag,
  ClipboardList,
  Sparkles,
  X,
} from "lucide-react";
import FormTagInput from "./FormTagInput";
import { uploadToImgBB } from "@/utils";

const AddProductForm = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  console.log(files);
  const [uploading, setUploading] = useState(false);
  // Custom states for Array fields
  const [usageSteps, setUsageSteps] = useState([]);
  const [skinTypes, setSkinTypes] = useState(["Normal"]);
  const [concerns, setConcerns] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  // 2. Update the handleSubmit logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploading(true);

    try {
      const formData = new FormData(e.target);
      // console.log(formData);
      formData.forEach((value, key) => {
        console.log(key, value);
      });


      const data = Object.fromEntries(formData.entries());
      // console.log(formData.entries());
      console.log([...formData.entries()]);


      // --- NEW: Upload Files to ImgBB ---
      const uploadedImageUrls = [];
      for (const file of files) {
        const url = await uploadToImgBB(file);
        uploadedImageUrls.push(url);
      }
      // ----------------------------------

      data.ingredients = ingredients;
      data.skinType = skinTypes;
      data.concerns = concerns;
      data.usageSteps = usageSteps; // <--- ADD THIS LINE
      // Combine uploaded images with any manual URLs if provided
      data.images = [...uploadedImageUrls].filter(Boolean);
      // Manually ensure isFeatured is a Boolean
      data.isFeatured = formData.get("isFeatured") === "true";
      console.log(data.isFeatured);
      // const res = await createProduct(data);

      // if (res.success) {
      //   toast.success(res.message);
      //   e.target.reset();
      //   setIngredients([]);
      //   setConcerns([]);
      //   setUsageSteps([]); // <--- RESET THIS STATE
      //   setFiles([]); // Clear files
      // } else {
      //   toast.error(res.message);
      // }
    } catch (err) {
      toast.error("Image upload failed. Check your API key.");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* SECTION 1: Basic Info */}
      <div className="glass-card p-8 space-y-6">
        <div className="flex items-center gap-2 text-primary font-bold mb-4">
          <ClipboardList size={20} /> <span>General Information</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label font-semibold">Product Name</label>
            <input
              name="name"
              type="text"
              placeholder="e.g. Vitamin C Serum"
              className="input input-bordered w-full bg-base-200/50"
              required
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold">Brand Name</label>
            <input
              name="brand"
              type="text"
              placeholder="GlowDerm"
              className="input input-bordered w-full bg-base-200/50"
              required
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold">Category</label>
            <select
              name="category"
              className="select select-bordered bg-base-200/50"
            >
              <option>Skincare</option>
              <option>Personal Care</option>
              <option>Haircare</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label font-semibold">SKU Number</label>
            <input
              name="sku"
              type="text"
              placeholder="GD-VC-001"
              className="input input-bordered w-full bg-base-200/50"
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label font-semibold">Product Description</label>
          <textarea
            name="description"
            className="textarea textarea-bordered h-32 w-full bg-base-200/50"
            placeholder="Describe the glow..."
          ></textarea>
        </div>
      </div>

      {/* SECTION 2: Pricing & Stock */}
      <div className="glass-card p-8 space-y-6">
        <div className="flex items-center gap-2 text-primary font-bold mb-4">
          <DollarSign size={20} /> <span>Inventory & Pricing</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="form-control">
            <label className="label font-semibold">Base Price ($)</label>
            <input
              name="price"
              type="number"
              step="0.01"
              className="input input-bordered bg-base-200/50"
              required
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold">Discount (%)</label>
            <input
              name="discount"
              type="number"
              defaultValue="0"
              className="input input-bordered bg-base-200/50"
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold">Stock Quantity</label>
            <input
              name="stock"
              type="number"
              className="input input-bordered bg-base-200/50"
              required
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: Beauty Attributes (Arrays) */}
      <div className="glass-card p-8 space-y-6">
        <div className="flex items-center gap-2 text-primary font-bold mb-4">
          <Sparkles size={20} /> <span>Beauty Specifics</span>
        </div>

        <div className="form-control">
          <label className="label font-semibold uppercase text-xs tracking-widest opacity-60">
            Skin Types
          </label>
          <div className="flex flex-wrap gap-4 mt-2">
            {["Normal", "Dry", "Oily", "Sensitive", "Combination"].map(
              (type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                    checked={skinTypes.includes(type)}
                    onChange={(e) => {
                      if (e.target.checked) setSkinTypes([...skinTypes, type]);
                      else setSkinTypes(skinTypes.filter((t) => t !== type));
                    }}
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ),
            )}
          </div>
          <div className="grid grid-cols-1 gap-6">
            {/* Ingredients Tag Input */}
            <FormTagInput
              label="Key Ingredients"
              placeholder="Add ingredient (e.g. Hyaluronic Acid)"
              tags={ingredients}
              setTags={setIngredients}
              color="primary"
            />

            {/* Concerns Tag Input */}
            <FormTagInput
              label="Skin Concerns"
              placeholder="Add concern (e.g. Dark Spots)"
              tags={concerns}
              setTags={setConcerns}
              color="secondary"
            />
          </div>
        </div>

        {/* Note: In a real app, use a proper Tag Input component for Ingredients/Concerns */}
        <div className="form-control">
          <label className="label font-semibold">Product Images</label>

          <div className="flex flex-col gap-4">
            {/* Custom File Input */}
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-base-300 rounded-2xl cursor-pointer hover:bg-base-200/50 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Package className="w-8 h-8 mb-2 text-primary opacity-60" />
                  <p className="text-sm text-base-content/60">
                    Click to upload product photos
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    setFiles([...files, ...Array.from(e.target.files)])
                  }
                />
              </label>
            </div>

            {/* Previews */}
            <div className="flex flex-wrap gap-4">
              {files.map((file, idx) => (
                  <div key={idx} className="relative w-20 h-20 group">
                    <Image
                      src={URL.createObjectURL(file)}
                      className="w-full h-full object-cover rounded-xl border border-base-300"
                      alt="Preview"
                      fill
                    />
                    <button
                    type="button"
                    onClick={() => setFiles(files.filter((_, i) => i !== idx))}
                    className="absolute -top-2 -right-2 bg-error text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* SECTION 4: Usage Routine */}
      <div className="glass-card p-8 space-y-6">
        <div className="flex items-center gap-2 text-primary font-bold mb-4">
          <ClipboardList size={20} /> <span>Usage Routine (Step-by-Step)</span>
        </div>

        <div className="form-control">
          <FormTagInput
            label="Step-by-Step Guide"
            placeholder="e.g. Apply 2-3 drops to clean, damp skin"
            tags={usageSteps}
            setTags={setUsageSteps}
            color="accent"
          />
          <p className="text-[10px] opacity-50 mt-2 italic">
            Tip: Add steps in order (e.g., 1. Cleanse, 2. Treat, 3. Moisturize)
          </p>
        </div>
      </div>
      {/* SECTION 5: Marketing & Visibility */}
      <div className="glass-card p-8 space-y-4 border-l-4 border-secondary">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="text-secondary" size={20} /> Featured Product
            </h3>
            <p className="text-xs opacity-50">
              Push this item to the Home Page "Best Sellers" or Hero sections.
            </p>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer gap-4">
              <span className="label-text font-bold opacity-70">
                Show on Home Page?
              </span>
              <input
                type="checkbox"
                name="isFeatured"
                value="true"
                className="toggle toggle-secondary"
              />
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full btn-lg rounded-full shadow-xl shadow-primary/20"
      >
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Publish Product"
        )}
      </button>
    </form>
  );
};

export default AddProductForm;
