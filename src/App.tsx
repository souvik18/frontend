import { useState } from "react";
import FileUploadForm from "./components/FileUploadForm";
import RecordTable from "./components/RecordTable";
import type { FailedRecord, SuccessRecord } from "./types/records";
import { MESSAGES, SERVER_URL } from "./constant";

const App = () => {
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [failedRecords, setFailedRecords] = useState<FailedRecord[]>([]);
  const [successRecords, setSuccessRecords] = useState<SuccessRecord[]>([]);

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(SERVER_URL, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadStatus(MESSAGES.uploadSuccess);
        setFailedRecords(result.failedRecords || []);
        setSuccessRecords(result.successfulRecords || []);
      } else {
        setUploadStatus(MESSAGES.validationFail);
        setFailedRecords(result.failedRecords || []);
        setSuccessRecords([]);
      }
    } catch (error) {
      setUploadStatus(
        MESSAGES.validationFail +
          ": " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
    }
  };

  const handleReset = () => {
    setUploadStatus("");
    setFailedRecords([]);
    setSuccessRecords([]);
  };

  return (
    <div className="main-container">
      <div className="styled-container">
        <div>
          <h2 className="text-center">Upload Customer Records (CSV/XML)</h2>
        </div>

        <FileUploadForm onUpload={handleFileUpload} onReset={handleReset} />

        {uploadStatus && (
          <div
            className={`mt-1rem text-center ${
              uploadStatus.startsWith(MESSAGES.uploadSuccess)
                ? "text-green"
                : "text-red"
            }`}
          >
            {uploadStatus}
          </div>
        )}

        <RecordTable type="success" records={successRecords} />
        <RecordTable type="failed" records={failedRecords} />
      </div>
    </div>
  );
};

export default App;
