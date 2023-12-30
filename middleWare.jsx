import { NextResponse } from "next/server";

export default function middleware(req) {
  const verify = req.cookies.get("loggedin");
  const url = req.url;

  if (!verify && url !== "/login") {
    return NextResponse.redirect("http://localhost:3000/login");
  }

  if (verify && url === "/") {
    return NextResponse.redirect("http://localhost:3000/");
  }

  return NextResponse.next();
}
