import { render, screen, cleanup } from "@testing-library/react";
import ErrorMessage from "../components/ErrorMessage";

afterEach(() => {
  cleanup();
});

describe("ErrorMessage component", () => {
  test("renders nothing when message is undefined", () => {
    render(<ErrorMessage />);
    expect(document.querySelector(".error-message")).toBeNull();
    expect(screen.queryByText(/./)).toBeNull();
  });

  test("renders paragraph with provided message and correct class", () => {
    const message = "Something went wrong";
    render(<ErrorMessage message={message} />);
    const errorMsg = screen.getByText(message);
    expect(errorMsg).toBeInTheDocument();
    expect(errorMsg).toHaveClass("error-message");
    expect(errorMsg.tagName.toLowerCase()).toBe("p");
  });
});
