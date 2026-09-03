export default function Footer() {
  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-gray-500">
        <p>© 2026 Blogify</p>

        <div className="flex gap-5">
          <span>About</span>
          <span>Help</span>
          <span>Privacy</span>
        </div>
      </div>
    </footer>
  );
}