import LoginForm from "@/components/auth/LoginForm";
import { Suspense } from "react";


export const metadata = {
  title: "Login",
  description: "Log in to your MUAAJ.beauty account to manage your skincare routine.",
};

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-200/30 px-4 py-20">
      <Suspense fallback={<div className="animate-pulse">Loading Form...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}