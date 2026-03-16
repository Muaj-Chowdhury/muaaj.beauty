"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export const SocialButtons = () => {
  const params = useSearchParams();

  const handleGoogleLogin = async () => {
    const result = await signIn("google", {
      // redirect: "false",
      callbackUrl: params.get("callbackUrl") || "/",
    });
  };

  return (
    <div className="">
      <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full rounded-full gap-3 border-primary/20 hover:bg-primary/5 hover:border-primary transition-all"
            >
              <FaGoogle className="text-lg" />
              <span className="font-medium">Continue with Google</span>
            </button>
    </div>
  );
};
