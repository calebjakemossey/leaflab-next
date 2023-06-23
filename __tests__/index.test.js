import { render, screen, fireEvent } from "@testing-library/react";
import Index from "../pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  test("Renders all homescreen elements", () => {
    render(<Index />);
    expect(screen.getByTestId("main")).toBeInTheDocument();
  });
  test("Topbar is visible", () => {
    render(<Index />);
    expect(screen.getByTestId("topbar")).toBeInTheDocument();
  });
  test("Topbar content is visible", () => {
    render(<Index />);
    expect(screen.getByTestId("topbar-content")).toBeInTheDocument();
  });
  test("Main container is visible", () => {
    render(<Index />);
    expect(screen.getByTestId("main-container")).toBeInTheDocument();
  });
  test("Header is visible", () => {
    render(<Index />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
  test("Subheader is visible", () => {
    render(<Index />);
    expect(screen.getByTestId("subheader")).toBeInTheDocument();
  });
  test("Button container is visible", () => {
    render(<Index />);
    expect(screen.getByTestId("button-container")).toBeInTheDocument();
  });
  test("Add button is visible", () => {
    render(<Index />);
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
  });
  test("Result is visible", () => {
    render(<Index />);
    expect(screen.getByTestId("result")).toBeInTheDocument();
  });
  test("Subtract button is visible", () => {
    render(<Index />);
    expect(screen.getByTestId("subtract-button")).toBeInTheDocument();
  });

  test("Check if adds properly", () => {
    render(<Index />);
    const addButton = screen.getByTestId("add-button");
    const resultElement = screen.getByTestId("result");

    fireEvent.click(addButton);

    expect(resultElement.textContent).toBe("1");
  });

  test("Check if subtracts properly", () => {
    render(<Index />);
    const subtractButton = screen.getByTestId("subtract-button");
    const resultElement = screen.getByTestId("result");

    fireEvent.click(subtractButton);

    expect(resultElement.textContent).toBe("-1");
  });
});
