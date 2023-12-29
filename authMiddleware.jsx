// import { NextResponse } from "next/server";

// export default function middleware(req) {
//   const verify = req.cookies.get("loggedin");
//   const url = req.url;

//   if (!verify && url !== "/login") {
//     // Redirect to the login page if not logged in and not on the login page
//     return NextResponse.redirect("http://localhost:3000/login");
//   }

//   if (verify && url === "/") {
//     // Redirect to the dashboard if logged in and trying to access the home page
//     return NextResponse.redirect("http://localhost:3000/");
//   }

//   // Continue to the next middleware or handler if no redirect is needed
//   return NextResponse.next();
// }

// In this file, you can define middleware to protect pages, components, and APIs.
// Use the `authMiddleware(req)` function to check if the user is authenticated.

// middleware/authMiddleware.js
'use client'
import { NextResponse } from 'next/server';
import { useSelector } from 'react-redux';

export function authMiddleware(req) { 
  const user = useSelector((state) => state.user.data);

  if (!checkUserAuthentication(user)) {
    return NextResponse.redirect('/login');
  }

  return NextResponse.next();
}

function checkUserAuthentication(user) {
  if (!user) {
    return false;
  }

  if (user.isAdmin === true) {
    return false; 
  }

  return true;
}
