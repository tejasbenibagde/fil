import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCog, Upload, FileText, FileCode, FileSpreadsheet } from "lucide-react"

export default function OtherTools() {
  const otherTools = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Text Tools",
      description: "Text formatting, counting, and conversion tools",
      href: "/tools/other/text",
    },
    {
      icon: <FileCode className="h-8 w-8" />,
      title: "Code Tools",
      description: "Code formatting, minification, and beautification",
      href: "/tools/other/code",
    },
    {
      icon: <FileSpreadsheet className="h-8 w-8" />,
      title: "Spreadsheet Tools",
      description: "Convert between CSV, Excel, and other formats",
      href: "/tools/other/spreadsheet",
    },
    {
      icon: <FileCog className="h-8 w-8" />,
      title: "Miscellaneous",
      description: "Other useful file utilities",
      href: "/tools/other/misc",
    },
  ]

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Other Tools</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {otherTools.map((tool, index) => (
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
          <h2 className="text-2xl font-bold mb-2">Upload your file</h2>
          <p className="text-muted-foreground mb-4 max-w-md">
            Select a tool above or upload your file here to get started. Your files are processed securely and
            privately.
          </p>
          <Button size="lg">Choose File</Button>
          <p className="text-xs text-muted-foreground mt-4">
            Various file formats supported depending on the tool. Max file size: 100MB.
          </p>
        </div>
      </Card>
    </div>
  )
}

