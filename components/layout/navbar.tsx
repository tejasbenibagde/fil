import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ModeToggle } from "../mode-toggle";
import Image from "next/image";
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/fil-white.svg"
              alt="Fil Logo"
              width={48}
              height={48}
              priority
              className="mix-blend-difference"
            />
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/tools"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              All Tools
            </Link>
            <Link
              href="/about"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              About
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            <Link
              href="https://github.com/tejasbenibagde/fil"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline" size="icon">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
