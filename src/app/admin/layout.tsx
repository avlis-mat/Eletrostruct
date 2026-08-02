import { redirect } from "next/dist/client/components/navigation";
import { Footer } from "~/_components/Footer";
import { Navbar } from "~/_components/Navbar";
import { auth } from "~/server/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/");

  return (
    <main className="--background min-h-screen">
      <Navbar />
      <div className="px-4 py-8">{children}</div>
      <Footer />
    </main>
  );
}
