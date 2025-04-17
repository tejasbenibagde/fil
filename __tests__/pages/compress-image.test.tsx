import { render, screen, fireEvent } from "@testing-library/react";
import CompressImage from "@/app/tools/image/compress/page";
import * as useImageProcessingModule from "@/hooks/use-image-processing";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
// import { useImageProcessing } from "../../hooks/use-image-processing";
// Mock the useImageProcessing hook
jest.mock("@/hooks/use-image-processing", () => {
  const originalModule = jest.requireActual(
    "../../hooks/use-image-processing.ts"
  );

  return {
    __esModule: true,
    ...originalModule,
    useImageProcessing: jest.fn(),
  };
});

describe("CompressImage", () => {
  const mockUseImageProcessing = {
    file: null,
    preview: null,
    isProcessing: false,
    progress: 0,
    isComplete: false,
    error: null,
    processedImage: null,
    processedFileName: "",
    stats: null,
    options: {
      quality: 80,
      format: "original",
      maintainAspectRatio: true,
    },
    updateOption: jest.fn(),
    handleFileSelected: jest.fn(),
    handleProcess: jest.fn(),
    handleReset: jest.fn(),
    formatFileSize: jest.fn((size) => `${size} B`),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useImageProcessingModule.useImageProcessing as jest.Mock).mockReturnValue(
      mockUseImageProcessing
    );
  });

  it("renders the file upload zone when no file is selected", () => {
    render(<CompressImage />);

    expect(screen.getByText("Compress Image")).toBeInTheDocument();
    expect(
      screen.getByText("Drag and drop your image here, or click to browse")
    ).toBeInTheDocument();
    expect(screen.getByText("Select Image")).toBeInTheDocument();
  });

  it("renders the compression options and preview when a file is selected", () => {
    const mockFile = new File(["dummy content"], "example.jpg", {
      type: "image/jpeg",
    });
    const mockPreview = "data:image/jpeg;base64,mockbase64";
    (useImageProcessingModule.useImageProcessing as jest.Mock).mockReturnValue({
      ...mockUseImageProcessing,
      file: mockFile,
      preview: mockPreview,
    });

    render(<CompressImage />);

    expect(screen.getByText("Basic Settings")).toBeInTheDocument();
    expect(screen.getByText("Advanced Settings")).toBeInTheDocument();
    expect(screen.getByText("Quality")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
    expect(screen.getByText("Output Format")).toBeInTheDocument();
    expect(screen.getByText("Original Image")).toBeInTheDocument();
    expect(screen.getByText("Compressed Image")).toBeInTheDocument();
    expect(screen.getByText("Compress Image")).toBeInTheDocument();
  });

  it("shows processing state when isProcessing is true", () => {
    const mockFile = new File(["dummy content"], "example.jpg", {
      type: "image/jpeg",
    });
    (useImageProcessingModule.useImageProcessing as jest.Mock).mockReturnValue({
      ...mockUseImageProcessing,
      file: mockFile,
      isProcessing: true,
      progress: 50,
    });

    render(<CompressImage />);

    expect(screen.getByText("Processing...")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows download button when processing is complete", () => {
    const mockFile = new File(["dummy content"], "example.jpg", {
      type: "image/jpeg",
    });
    const mockProcessedImage = "data:image/jpeg;base64,processedbase64";
    (useImageProcessingModule.useImageProcessing as jest.Mock).mockReturnValue({
      ...mockUseImageProcessing,
      file: mockFile,
      isComplete: true,
      processedImage: mockProcessedImage,
      processedFileName: "compressed-example.jpg",
    });

    render(<CompressImage />);

    expect(screen.getByText("Download Compressed Image")).toBeInTheDocument();
  });

  it("shows compression results when stats are available", () => {
    const mockFile = new File(["dummy content"], "example.jpg", {
      type: "image/jpeg",
    });
    const mockStats = {
      originalSize: 1000,
      processedSize: 500,
      compressionRatio: 50,
      width: 800,
      height: 600,
      format: "jpeg",
    };
    (useImageProcessingModule.useImageProcessing as jest.Mock).mockReturnValue({
      ...mockUseImageProcessing,
      file: mockFile,
      stats: mockStats,
    });

    render(<CompressImage />);

    expect(screen.getByText("Compression Results")).toBeInTheDocument();
    expect(screen.getByText("Original Size:")).toBeInTheDocument();
    expect(screen.getByText("Compressed Size:")).toBeInTheDocument();
    expect(screen.getByText("Space Saved:")).toBeInTheDocument();
    expect(screen.getByText("Reduction:")).toBeInTheDocument();
  });

  it("calls handleProcess when compress button is clicked", () => {
    const mockFile = new File(["dummy content"], "example.jpg", {
      type: "image/jpeg",
    });
    (useImageProcessingModule.useImageProcessing as jest.Mock).mockReturnValue({
      ...mockUseImageProcessing,
      file: mockFile,
    });

    render(<CompressImage />);

    fireEvent.click(screen.getByText("Compress Image"));

    expect(mockUseImageProcessing.handleProcess).toHaveBeenCalledTimes(1);
  });

  it("calls handleReset when reset button is clicked", () => {
    const mockFile = new File(["dummy content"], "example.jpg", {
      type: "image/jpeg",
    });
    (useImageProcessingModule.useImageProcessing as jest.Mock).mockReturnValue({
      ...mockUseImageProcessing,
      file: mockFile,
    });

    render(<CompressImage />);

    fireEvent.click(screen.getByText("Reset"));

    expect(mockUseImageProcessing.handleReset).toHaveBeenCalledTimes(1);
  });

  it("updates quality option when slider is changed", () => {
    const mockFile = new File(["dummy content"], "example.jpg", {
      type: "image/jpeg",
    });
    (useImageProcessingModule.useImageProcessing as jest.Mock).mockReturnValue({
      ...mockUseImageProcessing,
      file: mockFile,
    });

    render(<CompressImage />);

    // Find the slider and simulate a change
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: 60 } });

    expect(mockUseImageProcessing.updateOption).toHaveBeenCalledWith(
      "quality",
      60
    );
  });
});
