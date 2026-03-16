"use client";
import { ShoppingBag } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const CartButton = ({ product }) => {
  const { data: session, status } = useSession(); // Destructure properly
  const [isLoading, setIsLoading] = useState(false); // Add missing state
  const path = usePathname();
  const router = useRouter();

  const isLogin = status === "authenticated";

  const handleAdd2Cart = async () => {
    if (status === "loading") return;

    if (isLogin) {
      setIsLoading(true);
      alert("Added to cart");
      setIsLoading(false);
    } else {
      // Redirect to login with current path as callback
      router.push(`/login?callbackUrl=${encodeURIComponent(path)}`);
    }
  };

  return (
    <button
      disabled={status === "loading" || isLoading}
      onClick={handleAdd2Cart}
      className="btn btn-primary btn-circle btn-md shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform"
    >
      <ShoppingBag size={20} />
    </button>
  );
};

export default CartButton;
