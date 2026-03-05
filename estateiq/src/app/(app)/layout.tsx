import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { AuthModal } from "@/components/auth-modal";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <AuthModal />
    </>
  );
}
