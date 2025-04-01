import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Code, Github, BookOpen } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Documentation</h1>

      <div className="max-w-3xl mx-auto">
        <Card className="p-6 mb-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
            <p className="mb-4">
              Welcome to the Fil documentation! Here you'll find information about how to use our tools, how they work,
              and how you can contribute to the project.
            </p>
            <p>
              Our tools are designed to be simple and intuitive. Just select a tool category, choose the specific tool
              you need, and follow the on-screen instructions to process your files.
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 mr-2 text-primary" />
                <h2 className="text-xl font-bold">User Guides</h2>
              </div>
              <p className="text-muted-foreground mb-4 flex-grow">
                Detailed guides on how to use each of our tools effectively.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link href="/docs/guides">View Guides</Link>
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 mr-2 text-primary" />
                <h2 className="text-xl font-bold">API Documentation</h2>
              </div>
              <p className="text-muted-foreground mb-4 flex-grow">
                Technical documentation for developers who want to integrate with our tools.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link href="/docs/api">View API Docs</Link>
              </Button>
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Privacy & Security</h2>
            <p className="mb-4">
              At Fil, we take your privacy and security seriously. Here's how we protect your data:
            </p>
            <ul className="space-y-2 mb-4">
              <li>All file processing happens directly in your browser</li>
              <li>Your files are never uploaded to our servers</li>
              <li>We don't track your usage or collect personal data</li>
              <li>We don't use cookies for tracking or advertising</li>
              <li>Our code is open source and can be audited by anyone</li>
            </ul>
            <p>
              For more details, please see our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col items-center text-center">
            <Code className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-xl font-bold mb-2">Contributing</h2>
            <p className="text-muted-foreground mb-4">
              Fil is an open-source project, and we welcome contributions from the community. Whether you're fixing
              bugs, adding new features, or improving documentation, your help is appreciated!
            </p>
            <Button asChild>
              <Link href="https://github.com/tejasbenibagde/fil/" target="_blank" rel="noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Contribute on GitHub
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

