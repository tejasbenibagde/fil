import { FileUploadZone } from "@/components/layout/file-upload-zone";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("FileUploadZone", () => {
  it("should render correctly with default props", () => {
    renderComponent({ accept: ".png,image/*" });
    expect(screen.getByText(/upload/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /upload button/i })
    ).toBeInTheDocument();
  });
  it("should upload file using a hidden file input", async () => {
    const { onFileSelected, createFile } = renderComponent({
      accept: ".png,image/*",
    });
    const file = createFile("file.png", "image/png");

    const input = screen.getByTestId("file-input") as HTMLInputElement;
    await userEvent.upload(input, [file]);
    const uploadedFiles = onFileSelected.mock.calls[0][0];

    expect(onFileSelected).toHaveBeenCalledTimes(1);
    expect(uploadedFiles[0].name).toBe("file.png");
    expect(uploadedFiles[0].type).toBe("image/png");
  });
  it("should ignore files that do not match the accept prop", async () => {
    const { onFileSelected, createFile } = renderComponent({ accept: ".pdf" });
    const file1 = createFile("file1.pdf", "application/pdf");
    const file2 = createFile("file2.png", "image/png");

    const input = screen.getByTestId("file-input") as HTMLInputElement;
    await userEvent.upload(input, [file1, file2]);
    const uploadedFiles = onFileSelected.mock.calls[0][0];

    expect(onFileSelected).toHaveBeenCalledTimes(1);
    expect(uploadedFiles[0].name).toBe("file1.pdf");
    expect(uploadedFiles[0].type).toBe("application/pdf");
  });
  it("should limit number of files based on maxFiles prop", async () => {
    const { onFileSelected, createFile } = renderComponent({
      accept: ".png",
      maxFiles: 1,
    });
    const file1 = createFile("file1.png", "image/png");
    const file2 = createFile("file2.png", "image/png");

    const input = screen.getByTestId("file-input") as HTMLInputElement;
    await userEvent.upload(input, [file1, file2]);
    const uploadedFiles = onFileSelected.mock.calls[0][0];

    expect(onFileSelected).toHaveBeenCalledTimes(1);
    expect(uploadedFiles).toHaveLength(1);
    expect(uploadedFiles[0].name).toBe("file1.png");
    expect(uploadedFiles[0].type).toBe("image/png");
  });
  it("should call file dialog with button click", async () => {
    const { onFileSelected, createFile } = renderComponent({
      accept: ".png",
      maxFiles: 1,
    });
    const file = createFile("file.png", "image/png");
    const user = userEvent.setup();

    const uploadButton = screen.getByRole("button", { name: /upload button/i });
    const input = screen.getByTestId("file-input") as HTMLInputElement;
    await user.click(uploadButton);
    await user.upload(input, [file]);
    const uploadedFile = onFileSelected.mock.calls[0][0];

    expect(onFileSelected).toHaveBeenCalledTimes(1);
    expect(uploadedFile[0].name).toBe("file.png");
    expect(uploadedFile[0].type).toBe("image/png");
  });
  it("should not trigger file input if disabled", async () => {
    const { onFileSelected, createFile } = renderComponent({
      accept: ".png,image/*",
      disabled: true,
    });
    const file = createFile("file.png", "image/png");

    const input = screen.getByTestId("file-input") as HTMLInputElement;
    await userEvent.upload(input, file);

    expect(onFileSelected).not.toHaveBeenCalled();
  });
});

interface Props {
  accept?: string;
  maxFiles?: number;
  disabled?: boolean;
}

const renderComponent = ({ accept, maxFiles = 2, disabled = false }: Props) => {
  const onFileSelected = jest.fn();
  const acceptedFileTypes = accept;
  const createFile = (name: string, type: string) =>
    new File(["file"], name, { type });
  render(
    <FileUploadZone
      onFilesSelected={onFileSelected}
      accept={acceptedFileTypes}
      maxFiles={maxFiles}
      disabled={disabled}
    />
  );

  return {
    onFileSelected,
    createFile,
  };
};
