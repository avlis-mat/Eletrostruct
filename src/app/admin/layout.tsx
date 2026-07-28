import { Footer } from "~/_components/Footer";
import { Navbar } from "~/_components/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="--background min-h-screen">
      <Navbar />
      <div className="px-4 py-8">{children}</div>
      <Footer />
    </main>
  );
}
