/* eslint-disable @next/next/no-location-assign-relative-destination */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoggedIn(!!token);
  }, []);

  async function handleLogout() {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.removeItem("user");
      window.location.href = "/";
      return;
    }

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/";
    }
  }

  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href={isLoggedIn ? "/posts" : "/"}
          className="text-2xl font-bold tracking-tight"
        >
          Blogify
        </Link>

        {pathname === "/" ? (
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/login"
              className="text-gray-700 cursor-pointer transition hover:text-black"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="rounded-full cursor-pointer bg-black px-5 py-2.5 font-medium text-white transition hover:bg-gray-800"
            >
              Get started
            </Link>
          </nav>
        ) : (
          isLoggedIn && (
            <nav className="flex items-center gap-6 text-sm">
              <Link
                href="/profile"
                className="text-gray-700 cursor-pointer transition hover:text-black"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-full cursor-pointer bg-black px-5 py-2.5 font-medium text-white transition hover:bg-gray-800"
              >
                Logout
              </button>
            </nav>
          )
        )}
      </div>
    </header>
  );
}
