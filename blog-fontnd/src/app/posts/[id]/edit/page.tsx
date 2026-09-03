"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/api";
import type { Post } from "@/types";

interface PostResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Post;
}

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        setError("");

        const data = await apiRequest<PostResponse>(
          `/api/posts/${id}`,
        );

        setTitle(data.data.title);
        setContent(data.data.content);
        setStatus(data.data.status);
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

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await apiRequest(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          status,
        }),
      });

      router.push(`/posts/${id}`);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to update post.");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href={`/posts/${id}`}
          className="text-sm text-gray-500 transition hover:text-black"
        >
          ← Back to post
        </Link>

        <div className="mt-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Edit Post
          </h1>

          <p className="mt-2 text-gray-500">
            Update your story and save your changes.
          </p>
        </div>

        {loading && (
          <p className="mt-10 text-gray-500">
            Loading post...
          </p>
        )}

        {error && (
          <div className="mt-8 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && (
          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >
            {/* Title */}
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
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="Enter your post title"
                className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="mb-2 block text-sm font-medium"
              >
                Content
              </label>

              <textarea
                id="content"
                value={content}
                onChange={(event) =>
                  setContent(event.target.value)
                }
                placeholder="Write your story..."
                rows={14}
                className="w-full resize-none rounded-xl border border-black/10 px-4 py-3 leading-7 outline-none transition focus:border-black"
              />
            </div>

            {/* Status */}
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
                onChange={(event) =>
                  setStatus(
                    event.target.value as
                      | "draft"
                      | "published",
                  )
                }
                className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-black"
              >
                <option value="draft">Draft</option>
                <option value="published">
                  Published
                </option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 border-t border-black/10 pt-6">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <Link
                href={`/posts/${id}`}
                className="rounded-full border border-black/10 px-6 py-3 text-sm font-medium transition hover:bg-gray-100"
              >
                Cancel
              </Link>
            </div>
          </form>
        )}
      </section>

      <Footer />
    </main>
  );
}