"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/api";
import type { Post } from "@/types";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRouter } from "next/navigation";;

type Filter = "all" | "published" | "drafts";

interface PostsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    page: number;
    limit: number;
    posts: Post[];
  };
}

export default function PostsPage() {

    const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      let endpoint = "/api/posts";

      // ALL POSTS
      if (filter === "all") {
        endpoint = `/api/posts?search=${encodeURIComponent(search)}`;
      }

      // MY PUBLISHED POSTS
      if (filter === "published") {
        endpoint = `/api/posts/my?status=published&search=${encodeURIComponent(
          search,
        )}`;
      }

      // MY DRAFT POSTS
      if (filter === "drafts") {
        endpoint = `/api/posts/my?status=draft&search=${encodeURIComponent(
          search,
        )}`;
      }

      const data = await apiRequest<PostsResponse>(endpoint, {
        headers:
          filter === "all"
            ? {}
            : {
                Authorization: `Bearer ${token}`,
              },
      });

      setPosts(data.data.posts);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to load posts.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    fetchPosts();
  }

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
    return;
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [router]);

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* SIDEBAR */}
        <Sidebar filter={filter} setFilter={setFilter} />

        {/* MAIN CONTENT */}
        <section className="flex-1">
          <div className="mx-auto max-w-5xl px-6 py-10">
            {/* HEADER */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {filter === "all" && "Explore stories from everyone"}
                  {filter === "published" &&
                    "Your published stories"}
                  {filter === "drafts" && "Your draft stories"}
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight">
                  {filter === "all" && "All Posts"}
                  {filter === "published" && "Published"}
                  {filter === "drafts" && "Drafts"}
                </h1>
              </div>

              <Link
                href="/write"
                className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Write a Story
              </Link>
            </div>

            {/* SEARCH */}
            <form
              onSubmit={handleSearch}
              className="mt-8 flex gap-3"
            >
              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search posts..."
                className="w-full rounded-xl border border-black/10 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
              />

              <button
                type="submit"
                className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Search
              </button>
            </form>

            {/* ERROR */}
            {error && (
              <div className="mt-8 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* LOADING */}
            {loading && (
              <div className="mt-10 text-sm text-gray-500">
                Loading posts...
              </div>
            )}

            {/* POSTS */}
            {!loading && !error && (
              <div className="mt-10 space-y-4">
                {posts.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-black/10 px-6 py-16 text-center">
                    <h2 className="text-lg font-semibold">
                      No posts found
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      {filter === "drafts"
                        ? "You don't have any drafts yet."
                        : "There are no posts matching your search."}
                    </p>

                    {filter === "drafts" && (
                      <Link
                        href="/write"
                        className="mt-6 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white"
                      >
                        Write a Story
                      </Link>
                    )}
                  </div>
                ) : (
                  posts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/posts/${post.id}`}
                      className="group block rounded-2xl border border-black/10 p-6 transition hover:border-black/30 hover:shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="rounded-full bg-gray-100 px-3 py-1">
                            {post.status}
                          </span>

                          {post.author_name && (
                            <>
                              <span>•</span>
                              <span>
                                By {post.author_name}
                              </span>
                            </>
                          )}

                          {post.created_at && (
                            <>
                              <span>•</span>
                              <span>
                                {new Date(
                                  post.created_at,
                                ).toLocaleDateString()}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <h2 className="mt-4 text-2xl font-semibold tracking-tight transition group-hover:underline">
                        {post.title}
                      </h2>

                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                        {post.content}
                      </p>

                      <div className="mt-5 text-sm font-medium text-gray-500 group-hover:text-black">
                        Read story →
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}