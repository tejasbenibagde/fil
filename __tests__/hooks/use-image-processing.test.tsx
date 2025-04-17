import { renderHook, act } from "@testing-library/react";
import { useImageProcessing } from "@/hooks/use-image-processing";

// Mock fetch response
const mockSuccessResponse = {
  dataUrl: "data:image/jpeg;base64,abc123",
  originalSize: 1000,
  compressedSize: 500, // or resizedSize if resizing
  compressionRatio: 50,
  width: 800,
  height: 600,
  format: "jpeg",
  originalWidth: 1600,
  originalHeight: 1200,
};

describe("useImageProcessing", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock successful fetch response
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse),
      })
    );
  });

  it("initializes with default values", () => {
    const { result } = renderHook(() =>
      useImageProcessing({
        apiEndpoint: "/api/test",
        initialOptions: { quality: 80 },
      })
    );

    expect(result.current.file).toBeNull();
    expect(result.current.preview).toBeNull();
    expect(result.current.isProcessing).toBe(false);
    expect(result.current.progress).toBe(0);
    expect(result.current.isComplete).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.processedImage).toBeNull();
    expect(result.current.options).toEqual({ quality: 80 });
  });

  it("handles file selection", async () => {
    const { result } = renderHook(() =>
      useImageProcessing({ apiEndpoint: "/api/test" })
    );

    const file = new File(["dummy content"], "example.jpg", {
      type: "image/jpeg",
    });

    // Mock FileReader
    const mockFileReader = {
      readAsDataURL: jest.fn(),
      onload: jest.fn(),
      result: "data:image/jpeg;base64,mockbase64",
    };

    jest
      .spyOn(window, "FileReader")
      .mockImplementation(() => mockFileReader as any);

    act(() => {
      result.current.handleFileSelected([file]);
    });

    expect(result.current.file).toBe(file);

    // Simulate FileReader onload
    act(() => {
      mockFileReader.onload({
        target: { result: mockFileReader.result },
      } as any);
    });

    expect(result.current.preview).toBe(mockFileReader.result);
  });

  it("processes an image successfully", async () => {
    const { result } = renderHook(() =>
      useImageProcessing({ apiEndpoint: "/api/test" })
    );

    const file = new File(["dummy content"], "example.jpg", {
      type: "image/jpeg",
    });

    // Set up the file
    act(() => {
      result.current.setFile(file);
    });

    // Process the image
    await act(async () => {
      await result.current.handleProcess();
    });

    expect(result.current.isComplete).toBe(true);
    expect(result.current.processedImage).toBe(mockSuccessResponse.dataUrl);
    expect(result.current.stats).toEqual({
      originalSize: 1000,
      processedSize: 500,
      compressionRatio: 50,
      width: 800,
      height: 600,
      format: "jpeg",
    });
  });

  it("handles API errors", async () => {
    // Mock failed fetch response
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Processing failed" }),
      })
    );

    const { result } = renderHook(() =>
      useImageProcessing({ apiEndpoint: "/api/test" })
    );

    const file = new File(["dummy content"], "example.jpg", {
      type: "image/jpeg",
    });

    // Set up the file
    act(() => {
      result.current.setFile(file);
    });

    // Process the image
    await act(async () => {
      await result.current.handleProcess();
    });

    expect(result.current.error).toBe("Processing failed");
    expect(result.current.isComplete).toBe(false);
  });

  it("updates options correctly", () => {
    const { result } = renderHook(() =>
      useImageProcessing({
        apiEndpoint: "/api/test",
        initialOptions: { quality: 80 },
      })
    );

    act(() => {
      result.current.updateOption("quality", 60);
    });

    expect(result.current.options.quality).toBe(60);
  });

  it("resets state correctly", () => {
    const { result } = renderHook(() =>
      useImageProcessing({ apiEndpoint: "/api/test" })
    );

    const file = new File(["dummy content"], "example.jpg", {
      type: "image/jpeg",
    });

    // Set up some state
    act(() => {
      result.current.setFile(file);
      result.current.setPreview("data:image/jpeg;base64,test");
      result.current.updateOption("quality", 60);
    });

    // Reset
    act(() => {
      result.current.handleReset();
    });

    expect(result.current.file).toBeNull();
    expect(result.current.preview).toBeNull();
    expect(result.current.processedImage).toBeNull();
    expect(result.current.isComplete).toBe(false);
    // Options should not be reset
    expect(result.current.options.quality).toBe(60);
  });
});
