import { withAuth } from "next-auth/middleware";

// We wrap withAuth in a standard function so Next.js 16 can "see" the export
export default withAuth(
  function middleware(req) {
    // Standard middleware logic can go here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/orders/:path*", 
    "/admin/:path*",
    "/checkout"
  ],
};
