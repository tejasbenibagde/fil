import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileMinus, FilePlus, FileSearch, FileText, Upload } from "lucide-react"

export default function PDFTools() {
  const pdfTools = [
    {
      icon: <FileMinus className="h-8 w-8" />,
      title: "Compress PDF",
      description: "Reduce the size of your PDF files",
      href: "/tools/pdf/compress",
    },
    {
      icon: <FilePlus className="h-8 w-8" />,
      title: "Merge PDF",
      description: "Combine multiple PDF files into one",
      href: "/tools/pdf/merge",
    },
    {
      icon: <FileSearch className="h-8 w-8" />,
      title: "Split PDF",
      description: "Extract pages from your PDF file",
      href: "/tools/pdf/split",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Convert PDF",
      description: "Convert PDF to other formats and vice versa",
      href: "/tools/pdf/convert",
    },
  ]

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">PDF Tools</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {pdfTools.map((tool, index) => (
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

      <Card className="w-full p-6 bg-muted/50">
        <div className="flex flex-col items-center text-center">
          <Upload className="h-12 w-12 mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-2">Upload your PDF file</h2>
          <p className="text-muted-foreground mb-4 max-w-md">
            Select a tool above or upload your file here to get started. Your files are processed securely and
            privately.
          </p>
          <Button size="lg">Choose File</Button>
          <p className="text-xs text-muted-foreground mt-4">
            Max file size: 100MB. Your files are never stored on our servers.
          </p>
        </div>
      </Card>
    </div>
  )
}

