import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Heart, Code, Users } from "lucide-react";
export default function AboutPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">About Fil</h1>

      <div className="max-w-3xl mx-auto">
        <Card className="p-6 mb-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="mb-4">
              Fil was created with a simple mission: to provide free,
              open-source file utilities that respect your privacy and don't
              compromise on quality or usability.
            </p>
            <p className="mb-4">
              In a world where many online tools are filled with ads, track your
              data, or limit functionality behind paywalls, we wanted to create
              an alternative that puts users first.
            </p>
            <p>
              All of our tools are completely free to use, with no hidden fees,
              no account required, and no data collection. Your files are
              processed entirely in your browser and never uploaded to our
              servers.
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <Code className="h-12 w-12 mb-4 text-primary" />
              <h2 className="text-xl font-bold mb-2">Open Source</h2>
              <p className="text-muted-foreground mb-4">
                Our entire codebase is open source and available on GitHub. We
                believe in transparency and community-driven development.
              </p>
              <Button variant="outline" asChild>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Link>
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <Heart className="h-12 w-12 mb-4 text-primary" />
              <h2 className="text-xl font-bold mb-2">Support Us</h2>
              <p className="text-muted-foreground mb-4">
                If you find our tools useful, consider supporting the project.
                Your contributions help us maintain and improve the service.
              </p>
              <Button asChild>
                <Link href="/donate">Donate</Link>
              </Button>
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="mb-6">
              Fil is maintained by a small team of developers passionate about
              creating useful, accessible tools for everyone.
            </p>

            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">The Community</h3>
                <p className="text-muted-foreground">
                  Our most valuable team members are the contributors from the
                  open-source community who help improve our tools.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="mb-4">
              Have questions, suggestions, or found a bug? We'd love to hear
              from you!
            </p>
            <ul className="space-y-2">
              <li>
                <strong>GitHub Issues:</strong>{" "}
                <Link
                  href="https://github.com/tejasbenibagde/fil/issues"
                  className="text-primary hover:underline"
                >
                  Report bugs or suggest features
                </Link>
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:tejas.benibagde@gmail.com"
                  className="text-primary hover:underline"
                >
                  tejas.benibagde@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
