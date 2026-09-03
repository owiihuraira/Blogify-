/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="border-b border-black/10">
        <div className="mx-auto min-h-155 max-w-6xl px-6 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-4xl">
              <p className="mb-7 text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
                A place for ideas
              </p>

              <h1 className="text-6xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
                {" "}
                Where ideas <br /> find their readers.{" "}
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
                Blogify is a place where people share ideas, knowledge,
                experiences, and stories with the world.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Start writing
                </Link>

                <Link
                  href="/posts"
                  className="rounded-full border border-black/20 px-7 py-3.5 text-sm font-medium transition hover:bg-gray-100"
                >
                  Explore stories
                </Link>
              </div>
            </div>

           
            <div className="flex justify-center lg:justify-end">
              <img
                src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
                alt="Blog illustration"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-[0.18em]">
              Trending on Blogify
            </h2>

            <span className="text-sm text-gray-400">Discover</span>
          </div>

          <div className="grid gap-x-10 gap-y-12 md:grid-cols-3">
            <article>
              <div className="flex items-start gap-5">
                <span className="text-4xl font-bold text-gray-200">01</span>

                <div>
                  <p className="text-sm text-gray-500">Programming</p>

                  <h3 className="mt-2 text-xl font-bold leading-snug">
                    Learning Node.js
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    Learn how to build powerful APIs using Node.js.
                  </p>

                  <p className="mt-4 text-xs text-gray-400">5 min read</p>
                </div>
              </div>
            </article>

            <article>
              <div className="flex items-start gap-5">
                <span className="text-4xl font-bold text-gray-200">02</span>

                <div>
                  <p className="text-sm text-gray-500">Development</p>

                  <h3 className="mt-2 text-xl font-bold leading-snug">
                    Building REST APIs
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    Understand the architecture behind modern REST APIs.
                  </p>

                  <p className="mt-4 text-xs text-gray-400">7 min read</p>
                </div>
              </div>
            </article>

            <article>
              <div className="flex items-start gap-5">
                <span className="text-4xl font-bold text-gray-200">03</span>

                <div>
                  <p className="text-sm text-gray-500">React</p>

                  <h3 className="mt-2 text-xl font-bold leading-snug">
                    React Architecture
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    Build scalable and maintainable React applications.
                  </p>

                  <p className="mt-4 text-xs text-gray-400">6 min read</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="border-b border-black/10">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              Built for writers
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Your ideas deserve a place to live.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Write about what you know. Share what you have learned. Tell
              stories that matter to you.
            </p>
          </div>

          <div className="border-l border-black/10 pl-8 md:pl-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold">Write freely</h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Create and publish your own articles without unnecessary
                  complexity.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">Discover ideas</h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Explore stories and learn from different perspectives.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">Build your profile</h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Create your identity as a writer and share your work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-28">
          <div className="max-w-3xl">
            <h2 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
              Start sharing what you know.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Join Blogify and start writing your first story today.
            </p>

            <Link
              href="/register"
              className="mt-9 inline-block rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Get started
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
