import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, FileText, Image, FileArchive, FileAudio, FileVideo } from "lucide-react"

export default function ApiDocsPage() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Documentation</h1>

        <Card className="p-6 mb-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Getting Started with the Pix API</h2>
            <p className="mb-4">
              The Pix API allows developers to integrate our file processing tools into their own applications. This
              documentation provides information on how to use the API.
            </p>
            <h3 className="text-xl font-bold mt-6 mb-3">Authentication</h3>
            <p className="mb-4">
              To use the Pix API, you'll need an API key. You can obtain one by registering for a developer account.
            </p>
            <div className="bg-muted p-4 rounded-md mb-4">
              <pre className="text-sm overflow-x-auto">
                <code>Authorization: Bearer YOUR_API_KEY</code>
              </pre>
            </div>
            <h3 className="text-xl font-bold mt-6 mb-3">Rate Limits</h3>
            <p className="mb-4">The API has the following rate limits:</p>
            <ul className="space-y-2 mb-4">
              <li>
                <strong>Free tier:</strong> 100 requests per day
              </li>
              <li>
                <strong>Developer tier:</strong> 1,000 requests per day
              </li>
              <li>
                <strong>Professional tier:</strong> 10,000 requests per day
              </li>
              <li>
                <strong>Enterprise tier:</strong> Custom limits
              </li>
            </ul>
            <h3 className="text-xl font-bold mt-6 mb-3">Base URL</h3>
            <p className="mb-4">All API endpoints are relative to the following base URL:</p>
            <div className="bg-muted p-4 rounded-md mb-4">
              <pre className="text-sm overflow-x-auto">
                <code>https://api.pixtools.com/v1</code>
              </pre>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="pdf" className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="pdf" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">PDF API</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Image API</span>
            </TabsTrigger>
            <TabsTrigger value="archive" className="flex items-center gap-2">
              <FileArchive className="h-4 w-4" />
              <span className="hidden sm:inline">Archive API</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <FileAudio className="h-4 w-4" />
              <span className="hidden sm:inline">Audio API</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <FileVideo className="h-4 w-4" />
              <span className="hidden sm:inline">Video API</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pdf" className="mt-6">
            <Card className="p-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">PDF API</h2>

                <h3 className="text-xl font-bold mt-6 mb-3">Compress PDF</h3>
                <p className="mb-4">Compress a PDF file to reduce its size.</p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Endpoint</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>POST /pdf/compress</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Request Parameters</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "file": "base64_encoded_file",
  "quality": 80  // Optional, default: 70
}`}</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Response</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "success": true,
  "file": "base64_encoded_file",
  "original_size": 1024000,
  "compressed_size": 512000,
  "compression_ratio": 50
}`}</code>
                  </pre>
                </div>

                <h3 className="text-xl font-bold mt-6 mb-3">Merge PDFs</h3>
                <p className="mb-4">Merge multiple PDF files into a single PDF.</p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Endpoint</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>POST /pdf/merge</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Request Parameters</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "files": [
    "base64_encoded_file_1",
    "base64_encoded_file_2",
    ...
  ]
}`}</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Response</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "success": true,
  "file": "base64_encoded_file"
}`}</code>
                  </pre>
                </div>

                <h3 className="text-xl font-bold mt-6 mb-3">Split PDF</h3>
                <p className="mb-4">Split a PDF file into multiple PDFs or extract specific pages.</p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Endpoint</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>POST /pdf/split</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Request Parameters</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "file": "base64_encoded_file",
  "pages": "1-3,5,7-9"  // Page ranges to extract
}`}</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Response</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "success": true,
  "files": [
    {
      "name": "split_1.pdf",
      "file": "base64_encoded_file"
    },
    ...
  ]
}`}</code>
                  </pre>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="image" className="mt-6">
            <Card className="p-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">Image API</h2>

                <h3 className="text-xl font-bold mt-6 mb-3">Compress Image</h3>
                <p className="mb-4">Compress an image to reduce its file size.</p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Endpoint</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>POST /image/compress</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Request Parameters</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "file": "base64_encoded_file",
  "quality": 80,  // Optional, default: 80
  "format": "jpg"  // Optional, default: original format
}`}</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Response</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "success": true,
  "file": "base64_encoded_file",
  "original_size": 1024000,
  "compressed_size": 512000,
  "compression_ratio": 50
}`}</code>
                  </pre>
                </div>

                <h3 className="text-xl font-bold mt-6 mb-3">Resize Image</h3>
                <p className="mb-4">Resize an image to specific dimensions.</p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Endpoint</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>POST /image/resize</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Request Parameters</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "file": "base64_encoded_file",
  "width": 800,  // Optional if height is provided
  "height": 600,  // Optional if width is provided
  "maintain_aspect_ratio": true  // Optional, default: true
}`}</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Response</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "success": true,
  "file": "base64_encoded_file",
  "width": 800,
  "height": 600
}`}</code>
                  </pre>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="archive" className="mt-6">
            <Card className="p-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">Archive API</h2>

                <h3 className="text-xl font-bold mt-6 mb-3">Create Archive</h3>
                <p className="mb-4">Create an archive (ZIP, RAR, 7Z) from multiple files.</p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Endpoint</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>POST /archive/create</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Request Parameters</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "files": [
    {
      "name": "file1.txt",
      "content": "base64_encoded_content"
    },
    {
      "name": "file2.jpg",
      "content": "base64_encoded_content"
    }
  ],
  "format": "zip",  // "zip", "rar", or "7z"
  "compression_level": 9  // Optional, 1-9, default: 6
}`}</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Response</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "success": true,
  "file": "base64_encoded_file",
  "format": "zip",
  "size": 1024000
}`}</code>
                  </pre>
                </div>

                <h3 className="text-xl font-bold mt-6 mb-3">Extract Archive</h3>
                <p className="mb-4">Extract files from an archive.</p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Endpoint</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>POST /archive/extract</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Request Parameters</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "file": "base64_encoded_file",
  "password": "optional_password"  // Optional
}`}</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Response</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "success": true,
  "files": [
    {
      "name": "file1.txt",
      "content": "base64_encoded_content",
      "size": 1024
    },
    {
      "name": "file2.jpg",
      "content": "base64_encoded_content",
      "size": 102400
    }
  ]
}`}</code>
                  </pre>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="audio" className="mt-6">
            <Card className="p-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">Audio API</h2>

                <h3 className="text-xl font-bold mt-6 mb-3">Convert Audio</h3>
                <p className="mb-4">Convert audio files between different formats.</p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Endpoint</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>POST /audio/convert</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Request Parameters</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "file": "base64_encoded_file",
  "format": "mp3",  // "mp3", "wav", "flac", "ogg", etc.
  "bitrate": 320,  // Optional, in kbps
  "sample_rate": 44100  // Optional, in Hz
}`}</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Response</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "success": true,
  "file": "base64_encoded_file",
  "format": "mp3",
  "bitrate": 320,
  "sample_rate": 44100,
  "duration": 180.5  // in seconds
}`}</code>
                  </pre>
                </div>

                <h3 className="text-xl font-bold mt-6 mb-3">Trim Audio</h3>
                <p className="mb-4">Trim an audio file to a specific time range.</p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Endpoint</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>POST /audio/trim</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Request Parameters</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "file": "base64_encoded_file",
  "start": 30.5,  // Start time in seconds
  "end": 60.2     // End time in seconds
}`}</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Response</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "success": true,
  "file": "base64_encoded_file",
  "duration": 29.7  // in seconds
}`}</code>
                  </pre>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="video" className="mt-6">
            <Card className="p-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">Video API</h2>

                <h3 className="text-xl font-bold mt-6 mb-3">Convert Video</h3>
                <p className="mb-4">Convert video files between different formats.</p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Endpoint</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>POST /video/convert</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Request Parameters</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "file": "base64_encoded_file",
  "format": "mp4",  // "mp4", "avi", "mkv", "webm", etc.
  "resolution": "720p",  // Optional, "480p", "720p", "1080p", etc.
  "bitrate": 2000  // Optional, in kbps
}`}</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Response</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "success": true,
  "file": "base64_encoded_file",
  "format": "mp4",
  "resolution": "720p",
  "bitrate": 2000,
  "duration": 180.5  // in seconds
}`}</code>
                  </pre>
                </div>

                <h3 className="text-xl font-bold mt-6 mb-3">Compress Video</h3>
                <p className="mb-4">Compress a video file to reduce its size.</p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Endpoint</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>POST /video/compress</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Request Parameters</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "file": "base64_encoded_file",
  "quality": 80,  // Optional, 1-100, default: 80
  "resolution": "720p"  // Optional, "480p", "720p", "1080p", etc.
}`}</code>
                  </pre>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="font-bold mb-2">Response</p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "success": true,
  "file": "base64_encoded_file",
  "original_size": 10240000,
  "compressed_size": 5120000,
  "compression_ratio": 50
}`}</code>
                  </pre>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="p-6">
          <div className="flex flex-col items-center text-center">
            <Code className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-xl font-bold mb-2">SDK & Code Examples</h2>
            <p className="text-muted-foreground mb-4">
              We provide SDKs for various programming languages to make it easier to integrate with our API.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
              <a href="#" className="bg-muted hover:bg-muted/80 p-3 rounded-md text-center">
                JavaScript SDK
              </a>
              <a href="#" className="bg-muted hover:bg-muted/80 p-3 rounded-md text-center">
                Python SDK
              </a>
              <a href="#" className="bg-muted hover:bg-muted/80 p-3 rounded-md text-center">
                PHP SDK
              </a>
              <a href="#" className="bg-muted hover:bg-muted/80 p-3 rounded-md text-center">
                Java SDK
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

