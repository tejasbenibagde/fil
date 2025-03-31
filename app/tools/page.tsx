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
} from "lucide-react";
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
// ToolList Component
function ToolList({
  tools,
}: {
  tools: {
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
  }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
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
  );
}

// Main Page Component
export default function ToolsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-4">All Tools</h1>
      <p className="text-lg text-gray-600 mb-8">
        Browse and use various file tools to simplify your work.
      </p>

      {/* Render ToolList with the tools array */}
      <ToolList tools={tools} />
    </div>
  );
}

export { ToolList, tools };
