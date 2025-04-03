import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import ToolList from "./tools/tool-list";
import tools from "./tools/tools-data";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Intro
                title="Free Open Source File Utilities"
                desc="A collection of free, open-source tools to work with your
                  files. No ads, no tracking, just utilities."
              />
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/tools">Get Started</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/docs">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Intro
                title="Our Tools"
                desc="Choose from our wide range of file utilities to make your work
                  easier."
              />
              <div className=" w-full max-w-5xl ">
                <ToolList tools={tools} />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Intro
                title="Open Source"
                desc="All our tools are open source and free to use. You can
                  contribute to the project on GitHub."
              />
              <div className="space-x-4">
                <Button variant="outline" asChild>
                  <Link
                    href="https://github.com/tejasbenibagde/fil"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const Intro = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
        {desc}
      </p>
    </div>
  );
};
