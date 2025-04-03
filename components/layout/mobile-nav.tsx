"use client"
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[240px] sm:w-[300px]" aria-describedby="">
        {/* Add this title for accessibility */}
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

        <div className="flex flex-col gap-4 py-4">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/tools"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            All Tools
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Terms
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
