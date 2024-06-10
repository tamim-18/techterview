import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);
// This middleware will protect all routes that match the pattern

// here we are using the clerkMiddleware to protect all routes that match the pattern
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});
// Path: clerk.js

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
