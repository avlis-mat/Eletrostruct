import { NextResponse } from "next/server";
import { verifyUserCredentials } from "~/server/auth/login";

export async function GET(request: Request) {
  return NextResponse.redirect(new URL("/login", request.url));
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("error", "invalid");
    return NextResponse.redirect(redirectUrl);
  }

  const authResult = await verifyUserCredentials(email, password);
  const redirectUrl = new URL("/login", request.url);

  if (authResult.status === "locked") {
    redirectUrl.searchParams.set("error", "locked");
    return NextResponse.redirect(redirectUrl);
  }

  if (authResult.status !== "success") {
    redirectUrl.searchParams.set("error", "invalid");
    return NextResponse.redirect(redirectUrl);
  }

  const display = authResult.user.name ?? authResult.user.email ?? "Usuário";
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set({
    name: "dev-user",
    value: display,
    path: "/",
  });
  return response;
}
