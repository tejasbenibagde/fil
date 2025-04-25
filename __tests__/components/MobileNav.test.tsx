import { MobileNav } from "@/components/layout/mobile-nav";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => {
  return {
    ...jest.requireActual("next/navigation"),
    usePathname: jest.fn(),
  };
});

describe("MobileNav", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/");
  });
  it("should render the toggle menu button", () => {
    const { getToggleButton } = renderComponent();
    const toggleButton = getToggleButton();

    expect(toggleButton).toBeInTheDocument();
  });
  it("should open the main navigation on clicking toggle menu", async () => {
    const { getToggleButton, getMainNavigation, user } = renderComponent();
    const toggleButton = getToggleButton();

    await user.click(toggleButton);

    const mainNavigation = getMainNavigation();
    expect(mainNavigation).toBeInTheDocument();
  });
  it.each([
    { text: "Home", url: "/" },
    { text: "All Tools", url: "/tools" },
    { text: "About", url: "/about" },
    { text: "PDF Tools", url: "/tools/pdf" },
    { text: "Image Tools", url: "/tools/image" },
    { text: "Archive Tools", url: "/tools/archive" },
    { text: "Audio Tools", url: "/tools/audio" },
    { text: "Video Tools", url: "/tools/video" },
    { text: "Privacy", url: "/privacy" },
    { text: "Terms", url: "/terms" },
    { text: "Contact", url: "/contact" },
  ])("should render $text link with url $url", async ({ text, url }) => {
    const { getToggleButton, getNavLink, user } = renderComponent();
    const toggleButton = getToggleButton();
    await user.click(toggleButton);

    const renderedLink = getNavLink(text);
    expect(renderedLink).toBeInTheDocument();
    expect(renderedLink).toHaveAttribute("href", url);
  });
});

const renderComponent = () => {
  const getToggleButton = () => screen.getByRole("button", { name: /toggle/i });
  const getMainNavigation = () =>
    screen.getByRole("heading", { name: /main/i });
  const getNavLink = (name: string) => screen.getByRole("link", { name });
  const user = userEvent.setup();
  render(<MobileNav />);

  return {
    getToggleButton,
    getMainNavigation,
    getNavLink,
    user,
  };
};
