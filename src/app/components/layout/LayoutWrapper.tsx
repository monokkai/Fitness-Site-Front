"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthOrGeneratePage =
    pathname?.startsWith("/auth") ||
    pathname?.startsWith("/register") ||
    pathname?.startsWith("/generate");

  return (
    <>
      {!isAuthOrGeneratePage && <Navbar />}
      <main className="bg-white text-white">{children}</main>
      {!isAuthOrGeneratePage && <Footer />}
    </>
  );
}
