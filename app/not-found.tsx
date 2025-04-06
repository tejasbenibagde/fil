import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileQuestion, Github, Code, ArrowLeft, Construction } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container py-16 flex flex-col items-center text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
        <FileQuestion className="h-10 w-10 text-primary" />
      </div>

      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>

      <p className="text-xl text-muted-foreground mb-8 max-w-lg">
        Oops! The page you&apos;re looking for doesn&apos;t exist yet.
      </p>

      <Card className="p-6 mb-8 max-w-2xl w-full">
        <div className="flex items-center gap-3 mb-4">
          <Construction className="h-6 w-6 text-amber-500" />
          <h2 className="text-xl font-bold">Project Under Development</h2>
        </div>

        <p className="text-muted-foreground mb-4 text-left">
          fil is an open-source project that&apos;s still under active development. Some features and pages are not yet
          implemented, including the one you&apos;re looking for.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/tools">Browse Available Tools</Link>
          </Button>
        </div>
      </Card>

      <Card className="p-6 max-w-2xl w-full bg-muted/50">
        <div className="flex items-center gap-3 mb-4">
          <Code className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold">Want to Contribute?</h2>
        </div>

        <p className="text-muted-foreground mb-6 text-left">
          We welcome contributions from developers of all skill levels! If you&apos;d like to help implement this page or fix
          other issues, here&apos;s how you can get started:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="space-y-2">
            <h3 className="font-medium">1. Fork the Repository</h3>
            <p className="text-sm text-muted-foreground">Start by forking our GitHub repository to your own account.</p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="https://github.com" target="_blank" rel="noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Link>
            </Button>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">2. Set Up Development Environment</h3>
            <p className="text-sm text-muted-foreground">Clone your fork and install dependencies:</p>
            <div className="bg-background p-2 rounded text-xs overflow-x-auto">
              <code>git clone https://github.com/yourusername/fil.git</code>
              <br />
              <code>cd fil</code>
              <br />
              <code>npm install</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">3. Create a New Branch</h3>
            <p className="text-sm text-muted-foreground">Create a branch for your feature or fix:</p>
            <div className="bg-background p-2 rounded text-xs overflow-x-auto">
              <code>git checkout -b feature/new-page-name</code>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">4. Submit a Pull Request</h3>
            <p className="text-sm text-muted-foreground">Push your changes and create a pull request on GitHub.</p>
            <Button size="sm" className="w-full" asChild>
              <Link href="/about" target="_blank" rel="noreferrer">
                View Contribution Guidelines
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Need help? Join our community on{" "}
            <Link href="https://github.com/issues" className="text-primary hover:underline">
              GitHub Discussions
            </Link>{" "}
            or email us at{" "}
            <a href="mailto:contact@example.com" className="text-primary hover:underline">
              contact@example.com
            </a>
            .
          </p>
        </div>
      </Card>
    </div>
  )
}

