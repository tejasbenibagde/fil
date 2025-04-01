import { Card } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="max-w-3xl mx-auto">
        <Card className="p-6">
          <div className="prose max-w-none">
            <p className="mb-4">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="mb-4">
              Welcome to Fil. By using our website and services, you agree to these Terms of Service. Please read them
              carefully.
            </p>

            <h2 className="text-2xl font-bold mb-4">Use of Services</h2>
            <p className="mb-4">
              Our services are provided for personal and commercial use. You may use our tools to process files for any
              lawful purpose, subject to the restrictions below.
            </p>

            <h2 className="text-2xl font-bold mb-4">Restrictions</h2>
            <p className="mb-4">When using our services, you agree not to:</p>
            <ul className="space-y-2 mb-4">
              <li>Use our services for any illegal purpose</li>
              <li>Upload or process files that contain malware, viruses, or other harmful code</li>
              <li>
                Attempt to reverse engineer, decompile, or otherwise try to extract the source code of our services
              </li>
              <li>
                Use automated methods to access or use our services in a way that could damage or overload our
                infrastructure
              </li>
              <li>Infringe on the intellectual property rights of others</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
            <p className="mb-4">
              Fil is open-source software released under the MIT License. The source code is available on GitHub. You
              are free to use, modify, and distribute the code according to the terms of the MIT License.
            </p>
            <p className="mb-4">
              The Fil name, logo, and branding are the property of Fil and may not be used without permission.
            </p>

            <h2 className="text-2xl font-bold mb-4">Disclaimer of Warranties</h2>
            <p className="mb-4">
              Our services are provided "as is" without any warranties, express or implied. We do not guarantee that our
              services will be error-free, secure, or available at all times.
            </p>

            <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              To the fullest extent permitted by law, Fil shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or
              indirectly, or any loss of data, use, goodwill, or other intangible losses.
            </p>

            <h2 className="text-2xl font-bold mb-4">Changes to These Terms</h2>
            <p className="mb-4">
              We may update these Terms of Service from time to time. We will notify you of any changes by posting the
              new Terms on this page and updating the "Last Updated" date.
            </p>

            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="mb-4">If you have any questions about these Terms of Service, please contact us at:</p>
            <p>
              <a href="mailto:terms@example.com" className="text-primary hover:underline">
                terms@example.com
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

