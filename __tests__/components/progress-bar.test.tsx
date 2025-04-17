import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProgressBar } from "@/components/layout/progress-bar";
describe("ProgressBar", () => {
  it("renders with the correct progress value", () => {
    render(<ProgressBar progress={50} />);

    // Check if the progress text is displayed
    expect(screen.getByText("Processing...")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();

    // Check if the progress bar is rendered
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "50");
  });

  it("renders with 0% progress", () => {
    render(<ProgressBar progress={0} />);
    expect(screen.getByText("0%")).toBeInTheDocument();

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "0");
  });

  it("renders with 100% progress", () => {
    render(<ProgressBar progress={100} />);
    expect(screen.getByText("100%")).toBeInTheDocument();

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "100");
  });
});
