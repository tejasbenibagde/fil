import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileVideo, Film, Scissors, Subtitles } from "lucide-react";

export default function VideoTools() {
  const videoTools = [
    {
      icon: <FileVideo className="h-8 w-8" />,
      title: "Convert Video",
      description: "Convert between MP4, AVI, MKV, and other video formats",
      href: "/tools/video/convert",
    },
    {
      icon: <Film className="h-8 w-8" />,
      title: "Compress Video",
      description: "Reduce the file size of your video files",
      href: "/tools/video/compress",
    },
    {
      icon: <Scissors className="h-8 w-8" />,
      title: "Trim Video",
      description: "Cut and trim your video files",
      href: "/tools/video/trim",
    },
    {
      icon: <Subtitles className="h-8 w-8" />,
      title: "Add Subtitles",
      description: "Add subtitles to your video files",
      href: "/tools/video/subtitles",
    },
  ];

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Video Tools</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {videoTools.map((tool, index) => (
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
  );
}
