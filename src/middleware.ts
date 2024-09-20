import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { request } from "http";

export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) {
    console.error("NEXTAUTH_SECRET is not defined"); 
    throw new Error("NEXTAUTH_SECRET is not defined in the environment variables.");
  }

  
  const token = await getToken({ req, secret });
  console.log(token,"======================")
  const { pathname } = req.nextUrl;

  
  console.log("Token:", token);

  const isPublicPath = pathname=='/login' || pathname ==='/signup'

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/',req.url))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login',req.url))
  }
  

  return NextResponse.next();
}


export const config = {
  matcher: ["/", "/signup","/login","/profile/admin"],
};
