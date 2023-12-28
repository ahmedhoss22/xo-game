import { NextResponse } from "next/server";

export default function middleware(req) {
  const verify = req.cookies.get("loggedin");
  const url = req.url;

  if (!verify && url !== "/login") {
    // Redirect to the login page if not logged in and not on the login page
    return NextResponse.redirect("http://localhost:3000/login");
  }

  if (verify && url === "/") {
    // Redirect to the dashboard if logged in and trying to access the home page
    return NextResponse.redirect("http://localhost:3000/");
  }

  // Continue to the next middleware or handler if no redirect is needed
  return NextResponse.next();
}
