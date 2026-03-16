"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Get the 'callbackUrl' from the URL, or default to '/shop'
  const callbackUrl = searchParams.get("callbackUrl") || "/shop";

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: e.target[0].value,
      password: e.target[1].value,
      redirect: false,
    });
    if (res.error) toast.error(res.error);
    else {
      toast.success("Welcome back!");
      // Redirect to the intended route
      router.push(callbackUrl);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl });
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md p-8 glass-card bg-base-100/50 backdrop-blur-xl border-primary/10 shadow-2xl"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary italic">Welcome Back</h2>
        <p className="text-base-content/60 mt-2">
          Enter your details to access your glow.
        </p>
      </div>

      <form onSubmit={handleCredentialsLogin} className="space-y-6">
        <div className="form-control">
          <label className="label text-xs uppercase tracking-widest font-bold opacity-70">
            Email Address
          </label>
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40"
              size={18}
            />
            <input
              type="email"
              placeholder="name@example.com"
              className="input input-bordered w-full pl-12 bg-base-200/50 focus:border-primary border-primary/10 transition-all"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label text-xs uppercase tracking-widest font-bold opacity-70">
            Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40"
              size={18}
            />
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full pl-12 bg-base-200/50 focus:border-primary border-primary/10 transition-all"
              required
            />
          </div>
          <label className="label">
            <Link
              href="#"
              className="label-text-alt link link-hover text-primary/70"
            >
              Forgot password?
            </Link>
          </label>
        </div>

        <button className="btn btn-primary w-full rounded-full gap-2 group shadow-lg shadow-primary/20">
          Sign In
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </form>
      <div className="divider text-xs opacity-50">OR</div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full rounded-full gap-3 border-primary/20 hover:bg-primary/5 hover:border-primary transition-all"
      >
        <FaGoogle className="text-lg" />
        <span className="font-medium">Continue with Google</span>
      </button>

      <div className="mt-8 text-center text-sm">
        <span className="text-base-content/60">Don't have an account? </span>
        <Link
          href={`/register?callbackUrl=${callbackUrl}`}
          className="font-bold text-primary hover:underline"
        >
          Create one
        </Link>
      </div>
    </motion.div>
  );
};

export default LoginForm;
