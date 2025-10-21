import { MESSAGES } from "../constant";
import type { FailedRecord, SuccessRecord } from "../types/records";

type RecordTableProps =
  | {
      type: "success";
      records: SuccessRecord[];
    }
  | {
      type: "failed";
      records: FailedRecord[];
    };

const RecordTable = ({ type, records }: RecordTableProps) => {
  if (records.length === 0) return null;

  return (
    <div className="record-table-container">
      <h3>
        {type === "success"
          ? MESSAGES.successfulRecords
          : MESSAGES.failedRecords}
      </h3>
      <table
        className={`record-table ${type === "success" ? "success" : "failed"}`}
      >
        <thead>
          <tr>
            <th>Transaction Reference</th>
            <th>Description</th>
            {type === "failed" && <th>Reason</th>}
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.reference}</td>
              <td>{record.description}</td>
              {type === "failed" && "reason" in record && (
                <td>{record.reason}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordTable;
