"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetFooter } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import {
  Menu,
  Home,
  FileText,
  ImagePlus,
  FileArchive,
  FileAudio,
  FileVideo,
  FileCog,
  Info,
  Shield,
  Mail,
  Github,
} from "lucide-react"
import Image from "next/image";

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const mainLinks = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4 mr-2" /> },
    { href: "/tools", label: "All Tools", icon: <FileCog className="h-4 w-4 mr-2" /> },
    { href: "/about", label: "About", icon: <Info className="h-4 w-4 mr-2" /> },
  ]

  const toolLinks = [
    { href: "/tools/pdf", label: "PDF Tools", icon: <FileText className="h-4 w-4 mr-2" /> },
    { href: "/tools/image", label: "Image Tools", icon: <ImagePlus className="h-4 w-4 mr-2" /> },
    { href: "/tools/archive", label: "Archive Tools", icon: <FileArchive className="h-4 w-4 mr-2" /> },
    { href: "/tools/audio", label: "Audio Tools", icon: <FileAudio className="h-4 w-4 mr-2" /> },
    { href: "/tools/video", label: "Video Tools", icon: <FileVideo className="h-4 w-4 mr-2" /> },
  ]

  const legalLinks = [
    { href: "/privacy", label: "Privacy", icon: <Shield className="h-4 w-4 mr-2" /> },
    { href: "/terms", label: "Terms", icon: <FileText className="h-4 w-4 mr-2" /> },
    { href: "/contact", label: "Contact", icon: <Mail className="h-4 w-4 mr-2" /> },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0" aria-describedby="">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
              <Image
                src="/fil-white.svg"
                alt="Fil Logo"
                width={36}
                height={36}
                priority
                className="mix-blend-difference"
              />
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto h-[calc(100vh-8rem)]">
          <div className="p-4">
            <h3 className="text-xs uppercase font-semibold text-muted-foreground mb-2">Main Navigation</h3>
            <nav className="space-y-1">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center py-2 px-3 text-sm rounded-md transition-colors ${isActive(link.href) ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                    }`}
                  onClick={() => setOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <Separator />

          <div className="p-4">
            <h3 className="text-xs uppercase font-semibold text-muted-foreground mb-2">Tools</h3>
            <nav className="space-y-1">
              {toolLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center py-2 px-3 text-sm rounded-md transition-colors ${isActive(link.href) ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                    }`}
                  onClick={() => setOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <Separator />

          <div className="p-4">
            <h3 className="text-xs uppercase font-semibold text-muted-foreground mb-2">Legal & Support</h3>
            <nav className="space-y-1">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center py-2 px-3 text-sm rounded-md transition-colors ${isActive(link.href) ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                    }`}
                  onClick={() => setOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <SheetFooter className="border-t p-4">
          <div className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href="https://github.com/tejasbenibagde/fil" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4 mr-1" />
                GitHub
              </Link>
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

