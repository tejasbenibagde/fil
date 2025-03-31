import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Image, FileArchive, FileAudio, FileVideo } from "lucide-react"

export default function GuidesPage() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">User Guides</h1>

        <Tabs defaultValue="pdf" className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="pdf" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">PDF</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Image</span>
            </TabsTrigger>
            <TabsTrigger value="archive" className="flex items-center gap-2">
              <FileArchive className="h-4 w-4" />
              <span className="hidden sm:inline">Archive</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <FileAudio className="h-4 w-4" />
              <span className="hidden sm:inline">Audio</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <FileVideo className="h-4 w-4" />
              <span className="hidden sm:inline">Video</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pdf" className="mt-6">
            <Card className="p-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">PDF Tools Guide</h2>

                <h3 className="text-xl font-bold mt-6 mb-3">Compress PDF</h3>
                <p className="mb-4">
                  Our PDF compression tool helps you reduce the file size of your PDF documents while maintaining
                  reasonable quality.
                </p>
                <ol className="space-y-2 mb-4">
                  <li>
                    <strong>Upload your PDF:</strong> Click the "Choose File" button or drag and drop your PDF file.
                  </li>
                  <li>
                    <strong>Adjust compression settings:</strong> Use the quality slider to balance file size and
                    quality.
                  </li>
                  <li>
                    <strong>Compress:</strong> Click the "Compress PDF" button to start the compression process.
                  </li>
                  <li>
                    <strong>Download:</strong> Once processing is complete, click "Download Compressed PDF" to save your
                    file.
                  </li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">Merge PDF</h3>
                <p className="mb-4">Combine multiple PDF files into a single document with our PDF merger tool.</p>
                <ol className="space-y-2 mb-4">
                  <li>
                    <strong>Upload your PDFs:</strong> Click "Add Files" or drag and drop multiple PDF files.
                  </li>
                  <li>
                    <strong>Arrange order:</strong> Drag the files to reorder them as needed.
                  </li>
                  <li>
                    <strong>Merge:</strong> Click "Merge PDFs" to combine the files.
                  </li>
                  <li>
                    <strong>Download:</strong> Once processing is complete, download your merged PDF.
                  </li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">Split PDF</h3>
                <p className="mb-4">Extract specific pages or split a PDF into multiple files.</p>
                <ol className="space-y-2 mb-4">
                  <li>
                    <strong>Upload your PDF:</strong> Select the PDF file you want to split.
                  </li>
                  <li>
                    <strong>Select pages:</strong> Choose which pages to extract or how to split the document.
                  </li>
                  <li>
                    <strong>Split:</strong> Click "Split PDF" to process your file.
                  </li>
                  <li>
                    <strong>Download:</strong> Download the resulting PDF file(s).
                  </li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">Convert PDF</h3>
                <p className="mb-4">Convert PDFs to other formats or convert other formats to PDF.</p>
                <ol className="space-y-2">
                  <li>
                    <strong>Upload your file:</strong> Select the file you want to convert.
                  </li>
                  <li>
                    <strong>Choose format:</strong> Select the output format from the dropdown menu.
                  </li>
                  <li>
                    <strong>Convert:</strong> Click "Convert" to process your file.
                  </li>
                  <li>
                    <strong>Download:</strong> Download the converted file when processing is complete.
                  </li>
                </ol>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="image" className="mt-6">
            <Card className="p-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">Image Tools Guide</h2>

                <h3 className="text-xl font-bold mt-6 mb-3">Compress Image</h3>
                <p className="mb-4">Reduce the file size of your images while maintaining reasonable quality.</p>
                <ol className="space-y-2 mb-4">
                  <li>
                    <strong>Upload your image:</strong> Click "Choose File" or drag and drop your image.
                  </li>
                  <li>
                    <strong>Adjust settings:</strong> Set the quality level and output format.
                  </li>
                  <li>
                    <strong>Compress:</strong> Click "Compress Image" to start the process.
                  </li>
                  <li>
                    <strong>Download:</strong> Download your compressed image when ready.
                  </li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">Resize Image</h3>
                <p className="mb-4">Change the dimensions of your images while maintaining aspect ratio.</p>
                <ol className="space-y-2 mb-4">
                  <li>
                    <strong>Upload your image:</strong> Select the image you want to resize.
                  </li>
                  <li>
                    <strong>Set dimensions:</strong> Enter the desired width and/or height.
                  </li>
                  <li>
                    <strong>Resize:</strong> Click "Resize Image" to process your image.
                  </li>
                  <li>
                    <strong>Download:</strong> Download the resized image when complete.
                  </li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">Convert Image</h3>
                <p className="mb-4">Convert between different image formats like JPG, PNG, WEBP, and more.</p>
                <ol className="space-y-2 mb-4">
                  <li>
                    <strong>Upload your image:</strong> Select the image you want to convert.
                  </li>
                  <li>
                    <strong>Choose format:</strong> Select the desired output format.
                  </li>
                  <li>
                    <strong>Convert:</strong> Click "Convert Image" to process your file.
                  </li>
                  <li>
                    <strong>Download:</strong> Download the converted image when ready.
                  </li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">Edit Image</h3>
                <p className="mb-4">Perform basic editing operations on your images.</p>
                <ol className="space-y-2">
                  <li>
                    <strong>Upload your image:</strong> Select the image you want to edit.
                  </li>
                  <li>
                    <strong>Apply edits:</strong> Use the available tools to crop, rotate, adjust colors, etc.
                  </li>
                  <li>
                    <strong>Save:</strong> Click "Save Changes" when you're done editing.
                  </li>
                  <li>
                    <strong>Download:</strong> Download the edited image.
                  </li>
                </ol>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="archive" className="mt-6">
            <Card className="p-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">Archive Tools Guide</h2>

                <h3 className="text-xl font-bold mt-6 mb-3">Compress Files</h3>
                <p className="mb-4">Create ZIP, RAR, or 7Z archives from multiple files.</p>
                <ol className="space-y-2 mb-4">
                  <li>
                    <strong>Upload files:</strong> Select multiple files to compress.
                  </li>
                  <li>
                    <strong>Choose format:</strong> Select the archive format (ZIP, RAR, 7Z).
                  </li>
                  <li>
                    <strong>Set options:</strong> Adjust compression level and other settings.
                  </li>
                  <li>
                    <strong>Compress:</strong> Click "Create Archive" to compress your files.
                  </li>
                  <li>
                    <strong>Download:</strong> Download the archive when processing is complete.
                  </li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">Extract Archive</h3>
                <p className="mb-4">Extract files from ZIP, RAR, 7Z, and other archive formats.</p>
                <ol className="space-y-2 mb-4">
                  <li>
                    <strong>Upload archive:</strong> Select the archive file you want to extract.
                  </li>
                  <li>
                    <strong>Extract:</strong> Click "Extract Files" to process the archive.
                  </li>
                  <li>
                    <strong>Download:</strong> Download the extracted files individually or as a folder.
                  </li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">Convert Archive</h3>
                <p className="mb-4">Convert between different archive formats.</p>
                <ol className="space-y-2">
                  <li>
                    <strong>Upload archive:</strong> Select the archive file you want to convert.
                  </li>
                  <li>
                    <strong>Choose format:</strong> Select the desired output format.
                  </li>
                  <li>
                    <strong>Convert:</strong> Click "Convert Archive" to process your file.
                  </li>
                  <li>
                    <strong>Download:</strong> Download the converted archive when ready.
                  </li>
                </ol>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="audio" className="mt-6">
            <Card className="p-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">Audio Tools Guide</h2>

                <h3 className="text-xl font-bold mt-6 mb-3">Convert Audio</h3>
                <p className="mb-4">Convert between MP3, WAV, FLAC, and other audio formats.</p>
                <ol className="space-y-2 mb-4">
                  <li>
                    <strong>Upload audio:</strong> Select the audio file you want to convert.
                  </li>
                  <li>
                    <strong>Choose format:</strong> Select the desired output format.
                  </li>
                  <li>
                    <strong>Set options:</strong> Adjust bitrate, sample rate, and other settings.
                  </li>
                  <li>
                    <strong>Convert:</strong> Click "Convert Audio" to process your file.
                  </li>
                  <li>
                    <strong>Download:</strong> Download the converted audio when ready.
                  </li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">Compress Audio</h3>
                <p className="mb-4">Reduce the file size of your audio files.</p>
                <ol className="space-y-2 mb-4">
                  <li>
                    <strong>Upload audio:</strong> Select the audio file you want to compress.
                  </li>
                  <li>
                    <strong>Adjust settings:</strong> Set the bitrate and quality level.
                  </li>
                  <li>
                    <strong>Compress:</strong> Click "Compress Audio" to start the process.
                  </li>
                  <li>
                    <strong>Download:</strong> Download your compressed audio when ready.
                  </li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">Trim Audio</h3>
                <p className="mb-4">Cut and trim your audio files.</p>
                <ol className="space-y-2 mb-4">
                  <li>
                    <strong>Upload audio:</strong> Select the audio file you want to trim.
                  </li>
                  <li>
                    <strong>Set range:</strong> Use the waveform editor to select the portion you want to keep.
                  </li>
                  <li>
                    <strong>Trim:</strong> Click "Trim Audio" to process your file.
                  </li>
                  <li>
                    <strong>Download:</strong> Download the trimmed audio when ready.
                  </li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">Merge Audio</h3>
                <p className="mb-4">Combine multiple audio files into one.</p>
                <ol className="space-y-2">
                  <li>
                    <strong>Upload files:</strong> Select multiple audio files to merge.
                  </li>
                  <li>
                    <strong>Arrange order:</strong> Drag the files to reorder them as needed.
                  </li>
                  <li>
                    <strong>Set options:</strong> Choose whether to add crossfade between tracks.
                  </li>
                  <li>
                    <strong>Merge:</strong> Click "Merge Audio" to combine the files.
                  </li>
                  <li>
                    <strong>Download:</strong> Download the merged audio when processing is complete.
                  </li>
                </ol>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="video" className="mt-6">
            <Card className="p-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">Video Tools Guide</h2>

                <h3 className="text-xl font-bold mt-6 mb-3">Convert Video</h3>
                <p className="mb-4">Convert between MP4, AVI, MKV, and other video formats.</p>
                <ol className="space-y-2 mb-4">
                  <li>
                    <strong>Upload video:</strong> Select the video file you want to convert.
                  </li>
                  <li>
                    <strong>Choose format:</strong> Select the desired output format.
                  </li>
                  <li>
                    <strong>Set options:</strong> Adjust resolution, bitrate, and other settings.
                  </li>
                  <li>
                    <strong>Convert:</strong> Click "Convert Video" to process your file.
                  </li>
                  <li>
                    <strong>Download:</strong> Download the converted video when ready.
                  </li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">Compress Video</h3>
                <p className="mb-4">Reduce the file size of your video files.</p>
                <ol className="space-y-2 mb-4">
                  <li>
                    <strong>Upload video:</strong> Select the video file you want to compress.
                  </li>
                  <li>
                    <strong>Adjust settings:</strong> Set the quality level, resolution, and bitrate.
                  </li>
                  <li>
                    <strong>Compress:</strong> Click "Compress Video" to start the process.
                  </li>
                  <li>
                    <strong>Download:</strong> Download your compressed video when ready.
                  </li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">Trim Video</h3>
                <p className="mb-4">Cut and trim your video files.</p>
                <ol className="space-y-2 mb-4">
                  <li>
                    <strong>Upload video:</strong> Select the video file you want to trim.
                  </li>
                  <li>
                    <strong>Set range:</strong> Use the timeline editor to select the portion you want to keep.
                  </li>
                  <li>
                    <strong>Trim:</strong> Click "Trim Video" to process your file.
                  </li>
                  <li>
                    <strong>Download:</strong> Download the trimmed video when ready.
                  </li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">Add Subtitles</h3>
                <p className="mb-4">Add subtitles to your video files.</p>
                <ol className="space-y-2">
                  <li>
                    <strong>Upload video:</strong> Select the video file you want to add subtitles to.
                  </li>
                  <li>
                    <strong>Upload subtitles:</strong> Upload a subtitle file (SRT, VTT, etc.) or create one.
                  </li>
                  <li>
                    <strong>Adjust settings:</strong> Set font, size, position, and timing.
                  </li>
                  <li>
                    <strong>Process:</strong> Click "Add Subtitles" to process your video.
                  </li>
                  <li>
                    <strong>Download:</strong> Download the video with subtitles when ready.
                  </li>
                </ol>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Tips for Using Our Tools</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                1
              </span>
              <p>
                <strong>Browser compatibility:</strong> Our tools work best in modern browsers like Chrome, Firefox,
                Edge, and Safari.
              </p>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                2
              </span>
              <p>
                <strong>File size limits:</strong> While we try to support large files, browser limitations may affect
                performance with very large files.
              </p>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                3
              </span>
              <p>
                <strong>Privacy:</strong> All processing happens in your browser. Your files are never uploaded to our
                servers.
              </p>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                4
              </span>
              <p>
                <strong>Save your work:</strong> Always download your processed files before closing the browser tab.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

