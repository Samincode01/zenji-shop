"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";

const AUTH_ROUTES = new Set(["/login", "/signup"]);

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.has(pathname);

  return (
    <>
      {!isAuthRoute ? <Navbar /> : null}
      {children}
    </>
  );
}
