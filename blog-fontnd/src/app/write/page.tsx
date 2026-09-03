/* eslint-disable @next/next/no-location-assign-relative-destination */
"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/api";

interface CreatePostResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    title: string;
    content: string;
    postId: number;
  };
}

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("published");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first.");
      return;
    }

    try {
      setLoading(true);

      const data = await apiRequest<CreatePostResponse>("/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          status,
        }),
      });

      console.log("Post created:", data);

      window.location.href = `/posts/${data.data.postId}`;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to create post.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/posts"
          className="text-sm text-gray-500 hover:text-black"
        >
          ← Back to stories
        </Link>

        <div className="mt-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Write a story
          </h1>

          <p className="mt-3 text-gray-500">
            Share your thoughts, ideas, and knowledge with the world.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium"
            >
              Title
            </label>

            <input
              id="title"
              type="text"
              placeholder="Enter your title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-black/20 px-4 py-3 text-lg outline-none transition placeholder:text-gray-400 focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-medium"
            >
              Content
            </label>

            <textarea
              id="content"
              placeholder="Write your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={12}
              className="w-full resize-none rounded-lg border border-black/20 px-4 py-3 text-base leading-7 outline-none transition placeholder:text-gray-400 focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-medium"
            >
              Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "draft" | "published")
              }
              className="rounded-lg cursor-pointer border border-black/20 px-4 py-3 text-sm outline-none focus:border-black"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-black cursor-pointer px-8 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish story"}
          </button>
        </form>
      </section>

      <Footer />
    </main>
  );
}