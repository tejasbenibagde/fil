import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileAudio, Upload, Music, Volume2, Scissors } from "lucide-react"

export default function AudioTools() {
  const audioTools = [
    {
      icon: <FileAudio className="h-8 w-8" />,
      title: "Convert Audio",
      description: "Convert between MP3, WAV, FLAC, and other audio formats",
      href: "/tools/audio/convert",
    },
    {
      icon: <Volume2 className="h-8 w-8" />,
      title: "Compress Audio",
      description: "Reduce the file size of your audio files",
      href: "/tools/audio/compress",
    },
    {
      icon: <Scissors className="h-8 w-8" />,
      title: "Trim Audio",
      description: "Cut and trim your audio files",
      href: "/tools/audio/trim",
    },
    {
      icon: <Music className="h-8 w-8" />,
      title: "Merge Audio",
      description: "Combine multiple audio files into one",
      href: "/tools/audio/merge",
    },
  ]

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Audio Tools</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {audioTools.map((tool, index) => (
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
          <h2 className="text-2xl font-bold mb-2">Upload your audio file</h2>
          <p className="text-muted-foreground mb-4 max-w-md">
            Select a tool above or upload your file here to get started. Your files are processed securely and
            privately.
          </p>
          <Button size="lg">Choose File</Button>
          <p className="text-xs text-muted-foreground mt-4">
            Supported formats: MP3, WAV, FLAC, AAC, OGG. Max file size: 100MB.
          </p>
        </div>
      </Card>
    </div>
  )
}

