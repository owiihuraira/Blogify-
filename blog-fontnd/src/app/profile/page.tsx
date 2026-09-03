"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/api";
import type { User } from "@/types";

interface ProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: User & {
    created_at: string;
    updated_at: string;
  };
}

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<ProfileResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await apiRequest<ProfileResponse>(
          "/api/auth/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setUser(data.data);

        // Keep localStorage user data updated
        localStorage.setItem("user", JSON.stringify(data.data));
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to load profile.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-gray-500">Loading profile...</p>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
            Account
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Your Profile
          </h1>

          <p className="mt-3 text-gray-600">
            Manage and view your account information.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {user && (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-5 border-b border-gray-200 pb-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-2xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-semibold">
                  {user.name}
                </h2>

                <p className="text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-sm text-gray-500">
                  User ID
                </p>

                <p className="mt-1 font-medium">
                  #{user.id}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Name
                </p>

                <p className="mt-1 font-medium">
                  {user.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="mt-1 font-medium">
                  {user.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Joined
                </p>

                <p className="mt-1 font-medium">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-6">
              <button
                onClick={handleLogout}
                className="rounded-lg cursor-pointer bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}