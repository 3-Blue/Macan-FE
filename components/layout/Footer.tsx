import Link from "next/link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xl font-bold">Macan</p>
          <p className="mt-2 max-w-xs text-sm text-zinc-600">
            Engineering, construction, and project management solutions.
          </p>
        </div>

        <nav className="flex flex-col gap-2 sm:flex-row sm:gap-8">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-700 hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-zinc-200 px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-sm text-zinc-500">
          © {year} Macan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}