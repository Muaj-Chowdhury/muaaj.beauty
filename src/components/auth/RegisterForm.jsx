'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { registerUser } from '@/lib/actions/auth.actions';
import toast from 'react-hot-toast';
import { SocialButtons } from './SocialButton';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
    const params = useSearchParams();
  const router = useRouter();
  const callbackUrl = params.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // Use the local 'data' object for both registration and sign-in
  const data = {
    name: e.target[0].value,
    email: e.target[1].value,
    password: e.target[2].value,
  };

  try {
    const res = await registerUser(data);

    if (res.success) {
      // Auto-login with the same credentials
      const loginRes = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: callbackUrl,
      });

      if (loginRes?.ok) {
        toast.success("Welcome to the Glow! Redirecting...");
        router.push(callbackUrl);
      } else {
        // If registration worked but login failed, send them to login page
        toast.error("Account created! Please log in manually.");
        router.push('/login');
      }
    } else {
      toast.error(res.message || "Registration failed");
    }
  } catch (error) {
    toast.error("An unexpected error occurred.");
  } finally {
    setLoading(false);
  }
};


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md p-8 glass-card bg-base-100/50 backdrop-blur-xl border-primary/10 shadow-2xl"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary italic">Join the Glow</h2>
        <p className="text-base-content/60 mt-2 text-balance">Create an account for personalized skincare.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="form-control">
          <label className="label text-xs uppercase tracking-widest font-bold opacity-70">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
            <input 
              name="name"
              type="text" 
              placeholder="Muaj Chowdhury" 
              className="input input-bordered w-full pl-12 bg-base-200/50 focus:border-primary border-primary/10 transition-all" 
              required 
              disabled={loading}
            />
          </div>
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label text-xs uppercase tracking-widest font-bold opacity-70">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
            <input 
              name="email"
              type="email" 
              placeholder="muaj@example.com" 
              className="input input-bordered w-full pl-12 bg-base-200/50 focus:border-primary border-primary/10 transition-all" 
              required 
              disabled={loading}
            />
          </div>
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label text-xs uppercase tracking-widest font-bold opacity-70">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
            <input 
              name="password"
              type="password" 
              placeholder="••••••••" 
              className="input input-bordered w-full pl-12 bg-base-200/50 focus:border-primary border-primary/10 transition-all" 
              required 
              disabled={loading}
              minLength={6}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 py-2">
          <input type="checkbox" className="checkbox checkbox-primary checkbox-sm border-primary/30" required disabled={loading} />
          <span className="text-xs text-base-content/60 leading-tight">
            I agree to the <Link href="/terms" className="link link-primary no-underline font-medium">Terms</Link> and <Link href="/privacy" className="link link-primary no-underline font-medium">Privacy Policy</Link>.
          </span>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="btn btn-primary w-full rounded-full gap-2 shadow-lg shadow-primary/20 disabled:bg-primary/50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <ShieldCheck size={18} />
              Create Account
            </>
          )}
        </button>
      </form>
      <div className="divider text-xs opacity-50">OR</div>
      <SocialButtons></SocialButtons>

      <div className="mt-8 text-center text-sm">
        <span className="text-base-content/60">Already a member? </span>
        <Link href="/login" className="font-bold text-primary hover:underline underline-offset-4">Log in</Link>
      </div>
    </motion.div>
  );
};

export default RegisterForm;