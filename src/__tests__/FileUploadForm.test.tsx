import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FileUploadForm from "../components/FileUploadForm";

describe("FileUploadForm", () => {
  const mockUpload = jest.fn();
  const mockReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders upload and reset buttons", () => {
    render(<FileUploadForm onUpload={mockUpload} onReset={mockReset} />);
    expect(screen.getByLabelText("upload button")).toBeInTheDocument();
    expect(screen.getByLabelText("reset button")).toBeInTheDocument();
  });

  test("updates file name display when a file is selected", async () => {
    render(<FileUploadForm onUpload={mockUpload} onReset={mockReset} />);
    const input = screen.getByLabelText(
      "Upload customer records file in CSV or XML format",
    ) as HTMLInputElement;

    const file = new File(["name,age\nAlice,30"], "test.csv", {
      type: "text/csv",
    });

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText("test.csv")).toBeInTheDocument();
    });
  });

  test("calls onUpload with selected file on submit", async () => {
    render(<FileUploadForm onUpload={mockUpload} onReset={mockReset} />);
    const input = screen.getByLabelText(
      "Upload customer records file in CSV or XML format",
    ) as HTMLInputElement;

    const file = new File(["name,age\nAlice,30"], "test.csv", {
      type: "text/csv",
    });

    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(screen.getByLabelText("upload button"));

    await waitFor(() => {
      expect(mockUpload).toHaveBeenCalledWith(file);
    });
  });

  test("calls onReset and clears file input on reset", async () => {
    render(<FileUploadForm onUpload={mockUpload} onReset={mockReset} />);
    const input = screen.getByLabelText(
      "Upload customer records file in CSV or XML format",
    ) as HTMLInputElement;

    const file = new File(["data"], "test.csv", { type: "text/csv" });
    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(screen.getByLabelText("reset button"));

    await waitFor(() => {
      expect(mockReset).toHaveBeenCalled();
      expect(input.value).toBe("");
    });
  });

  test("renders error message when validation fails", async () => {
    render(<FileUploadForm onUpload={mockUpload} onReset={mockReset} />);

    // Submit without selecting a file
    fireEvent.click(screen.getByLabelText("upload button"));

    await waitFor(() => {
      expect(screen.getByText("File is required.")).toBeInTheDocument();
    });
  });
});
