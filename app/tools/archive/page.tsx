import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileArchive, FolderArchive, FolderOpen } from "lucide-react"

export default function ArchiveTools() {
  const archiveTools = [
    {
      icon: <FileArchive className="h-8 w-8" />,
      title: "Compress Files",
      description: "Create ZIP, RAR, or 7Z archives from multiple files",
      href: "/tools/archive/compress",
    },
    {
      icon: <FolderOpen className="h-8 w-8" />,
      title: "Extract Archive",
      description: "Extract files from ZIP, RAR, 7Z, and other archive formats",
      href: "/tools/archive/extract",
    },
    {
      icon: <FolderArchive className="h-8 w-8" />,
      title: "Convert Archive",
      description: "Convert between different archive formats",
      href: "/tools/archive/convert",
    },
  ]

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Archive Tools</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {archiveTools.map((tool, index) => (
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
  )
}

