import { Card } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="max-w-3xl mx-auto">
        <Card className="p-6">
          <div className="prose max-w-none">
            <p className="mb-4">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="mb-4">
              At Fil, we are committed to protecting your privacy. This Privacy Policy explains how we handle your data
              when you use our website and services.
            </p>

            <h2 className="text-2xl font-bold mb-4">Information We Don&apos;t Collect</h2>
            <p className="mb-4">Our service is designed with privacy in mind. We do not:</p>
            <ul className="space-y-2 mb-4">
              <li>Collect or store your files</li>
              <li>Track your usage or behavior</li>
              <li>Use cookies for tracking or advertising</li>
              <li>Collect personal information</li>
              <li>Share any data with third parties</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">How Our Tools Work</h2>
            <p className="mb-4">
              All of our file processing tools operate entirely within your browser. When you upload a file to use with
              our tools:
            </p>
            <ul className="space-y-2 mb-4">
              <li>The file is processed locally in your browser</li>
              <li>The file is never sent to our servers</li>
              <li>The file is not stored anywhere except temporarily in your browser&apos;s memory</li>
              <li>Once you navigate away from the page or close your browser, the file is automatically removed</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            <p className="mb-4">
              We use minimal, privacy-focused analytics to help us understand how our website is used in aggregate. This
              analytics:
            </p>
            <ul className="space-y-2 mb-4">
              <li>Does not track individual users</li>
              <li>Does not use cookies</li>
              <li>Only collects anonymous, aggregated data like page views</li>
              <li>Cannot be used to identify you</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
            </p>

            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>
              <a href="mailto:tejas.benibagde@gmail.com" className="text-primary hover:underline">
                tejas.benibagde@gmail.com
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

