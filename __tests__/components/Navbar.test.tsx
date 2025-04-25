import { Navbar } from "@/components/layout/navbar";
import { render } from "@testing-library/react";
import { usePathname } from "next/navigation";
jest.mock("next/navigation", () => {
  return {
    ...jest.requireActual("next/navigation"),
    usePathname: jest.fn(),
  };
});

describe("Navbar", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/");
  });
  it("should render navbar and match snapshot", () => {
    const navbar = render(<Navbar />);
    expect(navbar).toMatchSnapshot();
  });
});
