import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  recordSchema,
  type RecordSchema,
} from "../validation/fileUploadSchema";
import ErrorMessage from "./ErrorMessage";

type FileUploadProps = {
  onUpload: (file: File) => void;
  onReset: () => void;
};

const FileUploadForm = ({ onUpload, onReset }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RecordSchema>({
    resolver: zodResolver(recordSchema),
  });

  const onSubmit = (data: RecordSchema) => {
    onUpload(data.file);
  };

  const handleReset = () => {
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onReset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="file-upload-wrapper">
        <label htmlFor="upload" className="custom-file-label">
          Choose File
        </label>

        <input
          type="file"
          id="upload"
          accept=".csv,.xml"
          ref={fileInputRef}
          aria-label="Upload customer records file in CSV or XML format"
          className="hidden-file-input"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setValue("file", file, { shouldValidate: true });
            }
          }}
        />

        <p className="file-name-display">
          {fileInputRef.current?.files?.[0]?.name || ""}
        </p>
      </div>

      <ErrorMessage
        message={
          typeof errors.file?.message === "string" ? errors.file.message : ""
        }
      />

      <div className="button-group">
        <button
          className="custom-button custom-upload-btn"
          aria-label="upload button"
          type="submit"
        >
          Upload
        </button>
        <button
          aria-label="reset button"
          className="custom-button custom-reset-btn"
          type="button"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default FileUploadForm;
