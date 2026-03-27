import { NextResponse, type NextRequest } from "next/server";

const ADMIN_COOKIE = "admin_auth";
const USER_COOKIE = "user_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const fullPath = `${req.nextUrl.pathname}${req.nextUrl.search}`;

  // 只保护 /admin 相关路由，登录页除外
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
    if (cookie !== "1") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("from", fullPath);
      return NextResponse.redirect(url);
    }
  }

  // 仅保护账号中心；测试与记录支持匿名 clientId 访问
  if (pathname.startsWith("/account")) {
    const token = req.cookies.get(USER_COOKIE)?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("from", fullPath);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};

