"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/api";
import type { Post, User } from "@/types";

interface PostResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Post;
}

export default function PostPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [post, setPost] = useState<Post | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        setError("");

        const data = await apiRequest<PostResponse>(
          `/api/posts/${id}`,
        );

        setPost(data.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to load post.");
        }
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPost();
    }
  }, [id]);

  async function handleDelete() {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await apiRequest(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.push("/posts");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to delete post.");
      }
    } finally {
      setDeleting(false);
    }
  }

  const isOwner =
    currentUser && post
      ? currentUser.id === post.user_id
      : false;

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/posts"
          className="text-sm text-gray-500 transition hover:text-black"
        >
          ← Back to stories
        </Link>

        {loading && (
          <p className="mt-12 text-gray-500">
            Loading post...
          </p>
        )}

        {error && (
          <p className="mt-12 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && post && (
          <article className="mt-12">
            {/* POST META */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span className="rounded-full bg-gray-100 px-3 py-1 capitalize">
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

            {/* TITLE */}
            <h1 className="mt-5 text-5xl font-bold leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* CONTENT */}
            <div className="mt-10 border-t border-black/10 pt-10">
              <p className="whitespace-pre-wrap text-lg leading-8 text-gray-700">
                {post.content}
              </p>
            </div>

            {/* OWNER ACTIONS */}
            {isOwner && (
              <div className="mt-10 flex items-center gap-3 border-t border-black/10 pt-6">
                <Link
                  href={`/posts/${post.id}/edit`}
                  className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium transition hover:bg-gray-100"
                >
                  Edit Post
                </Link>

                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="rounded-full cursor-pointer bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete Post"}
                </button>
              </div>
            )}
          </article>
        )}
      </section>

      <Footer />
    </main>
  );
}