import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

export default ToolList;
