"use client";
import { usePathname } from "next/navigation";
import { Header } from "./header";

export function ConditionalHeader() {
  const pathname = usePathname();
  
  // Don't show header on login page
  if (pathname === "/login") {
    return null;
  }
  
  return <Header />;
}

