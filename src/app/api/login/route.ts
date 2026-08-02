// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { db } from "~/server/db";

// export async function POST(request: Request) {
//   const formData = await request.formData();
//   const email = formData.get("email")?.toString().trim();
//   const password = formData.get("password")?.toString();

//   if (!email || !password) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   const user = await db.user.findUnique({ where: { email } });
//   if (!user || !user.senha) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   const isValid = user.senha.startsWith("$2")
//     ? await bcrypt.compare(password, user.senha)
//     : user.senha === password;

//   if (!isValid) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   const display = user.name ?? user.email ?? "Usuário";
//   const response = NextResponse.redirect(new URL("/", request.url));
//   response.cookies.set({
//     name: "dev-user",
//     value: display,
//     path: "/",
//   });
//   return response;
// }

// lógica duplicada
