import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blogify",
  description: "A place to share ideas, stories, and knowledge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true" >{children}</body>
    </html>
  );
}