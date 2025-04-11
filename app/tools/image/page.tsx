import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ImagePlus, ImageDown, Crop, Images } from "lucide-react"

export default function ImageTools() {
  const imageTools = [
    {
      icon: <ImageDown className="h-8 w-8" />,
      title: "Compress Image",
      description: "Reduce the size of your image files",
      href: "/tools/image/compress",
    },
    {
      icon: <Crop className="h-8 w-8" />,
      title: "Resize Image",
      description: "Change the dimensions of your images",
      href: "/tools/image/resize",
    },
    {
      icon: <ImagePlus className="h-8 w-8" />,
      title: "Convert Image",
      description: "Convert between image formats",
      href: "/tools/image/convert",
    },
    {
      icon: <Images className="h-8 w-8" />,
      title: "Edit Image",
      description: "Basic image editing tools",
      href: "/tools/image/edit",
    },
  ]

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Image Tools</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {imageTools.map((tool, index) => (
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

