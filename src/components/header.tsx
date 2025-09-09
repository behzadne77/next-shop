"use client";
import Link from "next/link";
import { Button } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import {User2} from "lucide-react"

export function Header() {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    
    const links = [
        {
            title: "Features",
            link: '/features'
        },
        {
            title: "Pricing",
            link: '/pricing'
        },
        {
            title: "Docs",
            link: '/docs'
        }
    ]
    
  return (
    <header className="sticky top-1 z-40 w-full bg-gray-900/10 backdrop-blur container rounded-3xl mt-4 dark:bg-gray-600">
      <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold text-base text-gray-900 dark:text-gray-50">
            Salona
          </Link>
          <nav className="hidden sm:flex items-center gap-5 text-sm text-gray-800 dark:text-gray-100">
            {links.map(link => (
                <Link key={link.title} href={link.link} className="hover:text-foreground">
                    {link.title}
                </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button component={Link} href="/login" variant="filled" radius="md" leftSection={<User2 />}>
            Log in
          </Button>
        </div>
      </div>
    </header>
  );
}


