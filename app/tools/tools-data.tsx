import {
  FileText,
  FileArchive,
  FileAudio,
  FileVideo,
  FileCog,
  Images,
} from "lucide-react";
const tools = [
  {
    icon: <Images className="h-8 w-8" />,
    title: "Image Tools",
    description: "Resize, compress, and convert image files",
    href: "/tools/image",
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: "PDF Tools",
    description: "Compress, merge, split, and convert PDF files",
    href: "/tools/pdf",
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

export default tools;
