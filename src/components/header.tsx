"use client";
import Link from "next/link";
import { Button } from '@mantine/core';
import { User2,} from "lucide-react";

export function Header() {
    
    const links = [
        {
            title: "Products",
            link: '/product'
        },
        {
            title: "Posts",
            link: '/blog'
        },
        {
            title: "Docs",
            link: '/docs'
        }
    ]
    
  return (
    <header className="sticky top-1 z-40 w-full container mt-4">
      <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur ring-1 ring-gray-200/70 dark:ring-white/10 shadow-sm">
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/10 via-sky-400/10 to-cyan-300/10 blur-2xl" />
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-semibold text-base text-gray-900 dark:text-gray-50">
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Salona</span>
            </Link>
            <nav className="hidden sm:flex items-center gap-5 text-sm text-gray-700 dark:text-gray-200">
              {links.map(link => (
                <Link
                  key={link.title}
                  href={link.link}
                  className="relative transition-colors hover:text-indigo-600 dark:hover:text-cyan-300 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-indigo-500 after:to-cyan-400 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button component={Link} href="/login" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} radius="xl" leftSection={<User2 size={18} />}>
              Log in
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}


