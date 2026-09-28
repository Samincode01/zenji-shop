"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";

const FULL_NAV_ROUTES = new Set(["/"]);

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const showNavbar = FULL_NAV_ROUTES.has(pathname);

  return (
    <>
      {showNavbar ? <Navbar /> : null}
      {children}
    </>
  );
}
