import { render, screen } from "@testing-library/react";
import RecordTable from "../components/RecordTable";
import { MESSAGES } from "../constant";

const successRecords = [{ reference: "123", description: "Test transaction" }];

const failedRecords = [
  {
    reference: "456",
    description: "Bad transaction",
    reason: "Invalid balance",
  },
];

test("renders success records table", () => {
  render(<RecordTable type="success" records={successRecords} />);
  expect(screen.getByText(MESSAGES.successfulRecords)).toBeInTheDocument();
  expect(screen.getByText("Test transaction")).toBeInTheDocument();
});

test("renders failed records table with reason", () => {
  render(<RecordTable type="failed" records={failedRecords} />);
  expect(screen.getByText(MESSAGES.failedRecords)).toBeInTheDocument();
  expect(screen.getByText("Invalid balance")).toBeInTheDocument();
});
