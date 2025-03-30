import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Image,
  FileArchive,
  FileAudio,
  FileVideo,
  FileCog,
  Github,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  const tools = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "PDF Tools",
      description: "Compress, merge, split, and convert PDF files",
      href: "/tools/pdf",
    },
    {
      icon: <Image className="h-8 w-8" />,
      title: "Image Tools",
      description: "Resize, compress, and convert image files",
      href: "/tools/image",
    },
    {
      icon: <FileArchive className="h-8 w-8" />,
      title: "Archive Tools",
      description: "Compress and extract ZIP, RAR, and other archive files",
      href: "/tools/archive",
    },
    {
      icon: <FileAudio className="h-8 w-8" />,
      title: "Audio Tools",
      description: "Convert, compress, and edit audio files",
      href: "/tools/audio",
    },
    {
      icon: <FileVideo className="h-8 w-8" />,
      title: "Video Tools",
      description: "Convert, compress, and edit video files",
      href: "/tools/video",
    },
    {
      icon: <FileCog className="h-8 w-8" />,
      title: "Other Tools",
      description: "Various other utility tools for your files",
      href: "/tools/other",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 w-full border-b bg-background px-4 md:px-6">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <FileCog className="h-6 w-6" />
              <span className="inline-block font-bold">Fil</span>
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
              <Link
                href="/docs"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Documentation
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
              <ModeToggle />
            <nav className="flex items-center space-x-2">
              <Link href="https://github.com" target="_blank" rel="noreferrer">
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Free Open Source File Utilities
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A collection of free, open-source tools to work with your
                  files. No ads, no tracking, just utilities.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/tools">Get Started</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/docs">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Our Tools
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Choose from our wide range of file utilities to make your work
                  easier.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
                {tools.map((tool, index) => (
                  <Card key={index} className="transition-all hover:shadow-md">
                    <CardHeader>
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                        {tool.icon}
                      </div>
                      <CardTitle>{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={tool.href}>Use Tool</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Open Source
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  All our tools are open source and free to use. You can
                  contribute to the project on GitHub.
                </p>
              </div>
              <div className="space-x-4">
                <Button variant="outline" asChild>
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0 px-4 md:px-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} OpenUtils. All rights reserved. Open
            source under MIT license.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
