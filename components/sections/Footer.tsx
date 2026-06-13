export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-400 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>© {currentYear} nasaq.id (nasaq). All rights reserved.</p>
          <p>Built with Next.js 16, TypeScript & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
