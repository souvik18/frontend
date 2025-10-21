import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import { MESSAGES } from "../constant";

globalThis.fetch = jest.fn();

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component correctly", () => {
    render(<App />);
    expect(screen.getByText(/Upload Customer Records/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Upload/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset/i })).toBeInTheDocument();
  });

  test("handles successful file upload", async () => {
    const mockResponse = {
      success: true,
      failedRecords: [],
      successfulRecords: [{ reference: "12345", description: "file upload" }],
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    render(<App />);

    const file = new File(["test"], "test.csv", { type: "text/csv" });
    const uploadButton = screen.getByRole("button", { name: /Upload/i });

    fireEvent.change(screen.getByLabelText(/Choose file/i), {
      target: { files: [file] },
    });
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText(MESSAGES.uploadSuccess)).toBeInTheDocument();
    });
    expect(screen.getByText("file upload")).toBeInTheDocument();
    expect(screen.getByText("12345")).toBeInTheDocument();
  });

  test("handles failed file upload", async () => {
    const mockResponse = {
      success: false,
      failedRecords: [{ id: 1, error: "Invalid data" }],
      successfulRecords: [],
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    render(<App />);

    const file = new File(["test"], "test.csv", { type: "text/csv" });
    const uploadButton = screen.getByRole("button", { name: /Upload/i });

    fireEvent.change(screen.getByLabelText(/Choose file/i), {
      target: { files: [file] },
    });
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText(MESSAGES.validationFail)).toBeInTheDocument();
    });

    expect(screen.getByText("Validation failed on server")).toBeInTheDocument();
  });

  test("resets the state on reset button click", () => {
    render(<App />);

    const resetButton = screen.getByRole("button", { name: /Reset/i });
    fireEvent.click(resetButton);

    expect(screen.queryByText(MESSAGES.uploadSuccess)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES.validationFail)).not.toBeInTheDocument();
  });

  test("renders FileUploadForm and RecordTable components", () => {
    render(<App />);

    expect(screen.getByRole("button", { name: /Upload/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset/i })).toBeInTheDocument();
    expect(screen.getByText(/Upload Customer Records/i)).toBeInTheDocument();
  });
});
