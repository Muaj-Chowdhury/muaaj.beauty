import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Join the Glow",
  description: "Create an account at MUAAJ.beauty to enjoy personalized skincare recommendations and exclusive offers.",
};

export default function RegisterPage() {
  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-base-100 relative overflow-hidden px-4 py-20">
      
      {/* Background Decorative Glow (Matches your Home Banner) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -z-10" />

      <div className="w-full flex justify-center relative z-10">
        <RegisterForm />
      </div>
    </section>
  );
}