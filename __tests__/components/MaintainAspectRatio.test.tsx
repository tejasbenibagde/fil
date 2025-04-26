import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MaintainAspectRatio } from "@/components/layout/maintain-aspect-ratio";
import userEvent from "@testing-library/user-event";

describe("MaintainAspectRatio", () => {
  it("should render the component with default props", () => {
    renderComponent({ originalHeight: 400, originalWidth: 400 });
    expect(
      screen.getByRole("button", { name: /toggle aspect ratio/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  it("should render MaintainAspectRatio if maintainAspectRatio flag is true", () => {
    renderComponent({ originalHeight: 400, originalWidth: 400 });
    expect(
      screen.getByRole("button", { name: /toggle aspect ratio/i })
    ).toHaveAttribute("title", "Unlock aspect ratio");
    expect(screen.getByText("Maintain aspect ratio")).toBeInTheDocument();
  });
  it("should render Lock Aspect Ratio if maintainAspectRatio flag is true", () => {
    renderComponent({
      maintainAspectRatio: false,
      originalHeight: 400,
      originalWidth: 400,
    });
    expect(
      screen.getByRole("button", { name: /toggle aspect ratio/i })
    ).toHaveAttribute("title", "Lock aspect ratio");
    expect(screen.getByText("Free resize")).toBeInTheDocument();
  });
  it("should render Resize button only when originalWidth and originalHeight is provided", () => {
    renderComponent({ originalHeight: null, originalWidth: null });
    expect(
      screen.queryByRole("button", { name: /reset/i })
    ).not.toBeInTheDocument();
  });
  it("should call toggleAspectRatio on button click", async () => {
    const { toggleAspectRatio } = renderComponent({
      maintainAspectRatio: true,
      originalHeight: 400,
      originalWidth: 400,
    });
    const button = screen.getByRole("button", { name: /toggle aspect ratio/i });

    const user = userEvent.setup();
    await user.click(button);

    expect(toggleAspectRatio).toHaveBeenCalled();
  });
  it("should not call toggleAspectRatio is button is disabled", async () => {
    const { toggleAspectRatio } = renderComponent({
      maintainAspectRatio: true,
      originalHeight: 400,
      originalWidth: 400,
      disabled: true,
    });
    const button = screen.getByRole("button", { name: /toggle aspect ratio/i });

    const user = userEvent.setup();
    await user.click(button);

    expect(button).toBeDisabled();
    expect(toggleAspectRatio).not.toHaveBeenCalled();
  });
  it("should call resetDimensions on reset button click", async () => {
    const { resetDimensions } = renderComponent({
      maintainAspectRatio: true,
      originalHeight: 400,
      originalWidth: 400,
    });
    const button = screen.getByRole("button", { name: /reset/i });

    const user = userEvent.setup();
    await user.click(button);

    expect(resetDimensions).toHaveBeenCalled();
  });
  it("should not call resetDimensions if reset button is disabled", async () => {
    const { resetDimensions } = renderComponent({
      maintainAspectRatio: true,
      originalHeight: 400,
      originalWidth: 400,
      disabled: true,
    });
    const button = screen.getByRole("button", { name: /reset/i });

    const user = userEvent.setup();
    await user.click(button);

    expect(button).toBeDisabled();
    expect(resetDimensions).not.toHaveBeenCalled();
  });
});

interface Props {
  maintainAspectRatio?: boolean;
  originalWidth: number | null;
  originalHeight: number | null;
  disabled?: boolean;
}

const renderComponent = ({
  maintainAspectRatio = true,
  originalHeight,
  originalWidth,
  disabled = false,
}: Props) => {
  const toggleAspectRatio = jest.fn();
  const resetDimensions = jest.fn();
  render(
    <MaintainAspectRatio
      maintainAspectRatio={maintainAspectRatio}
      toggleAspectRatio={toggleAspectRatio}
      originalWidth={originalWidth}
      originalHeight={originalHeight}
      resetDimensions={resetDimensions}
      disabled={disabled}
    />
  );

  return {
    toggleAspectRatio,
    resetDimensions,
  };
};
