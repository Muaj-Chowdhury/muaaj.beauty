// src/middleware.js
export { default } from "next-auth/middleware";

export const config = {
  // These routes will require the user to be logged in
  matcher: [
    "/dashboard/:path*", 
    "/orders/:path*", 
    // "/admin/:path*",
    "/checkout"
  ],
};