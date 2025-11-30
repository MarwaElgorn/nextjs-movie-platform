"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Admin Protection HOC
 * Checks for admin session and redirects to login if not authenticated
 */
export function withAdminProtection(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      // Check if admin session exists
      const adminSession = localStorage.getItem("adminSession");
      if (!adminSession) {
        router.push("/login");
      } else {
        setIsAdmin(true);
      }
      setIsLoading(false);
    }, [router]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
          <div className="text-white">Loading...</div>
        </div>
      );
    }

    if (!isAdmin) {
      return null;
    }

    return <Component {...props} />;
  };
}
