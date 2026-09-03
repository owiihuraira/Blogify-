"use client";

import Link from "next/link";

type Filter = "all" | "published" | "drafts";

interface SidebarProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export default function Sidebar({ filter, setFilter }: SidebarProps) {
  return (
    <aside className="sticky top-0 hidden h-[calc(100vh-64px)] w-64 shrink-0 border-r border-black/10 bg-gray-50 md:block">
      <div className="flex h-full flex-col p-5">
        <div>
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Dashboard
          </p>

          <nav className="space-y-1">
            {/* POSTS */}
            <button
              onClick={() => setFilter("all")}
              className={`w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                filter === "all"
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Posts
            </button>

            {/* ALL POSTS */}
            <button
              onClick={() => setFilter("all")}
              className={`w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm transition ${
                filter === "all"
                  ? "bg-gray-200 font-medium text-black"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Posts
            </button>

            {/* PUBLISHED */}
            <button
              onClick={() => setFilter("published")}
              className={`w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm transition ${
                filter === "published"
                  ? "bg-gray-200 font-medium text-black"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Published
            </button>

            {/* DRAFTS */}
            <button
              onClick={() => setFilter("drafts")}
              className={`w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm transition ${
                filter === "drafts"
                  ? "bg-gray-200 font-medium text-black"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Drafts
            </button>
          </nav>
        </div>

        {/* WRITE */}
        <div className="mt-auto">
          <Link
            href="/write"
            className="block w-full rounded-xl bg-black px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-gray-800"
          >
            + Write a Story
          </Link>
        </div>
      </div>
    </aside>
  );
}