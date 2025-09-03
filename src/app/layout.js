'use client'

import "../styles/globals.css";
import { usePathname } from "next/navigation";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";
import ToastProvider from "@/components/ToastProvider";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const shouldHidePart = pathname.startsWith("/auth/") || pathname === "/dashboard" || pathname === "/dashboard/create" || pathname.startsWith("/dashboard/edit/");

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <ToastProvider>
            <Header />
            {children}
            {!shouldHidePart && <Footer />}
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}